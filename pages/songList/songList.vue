<template>
	<view>
		<scroll-view class="scrollGroup" scroll-y="true" @scroll="scroll" id="scrollGroup">
			<view class="title_group">
				<view class="status_bar" :style="{backgroundColor: backColor}">
					<!-- 这里是状态栏 -->
				</view>
				<view class="bg_img" :style="{backgroundImage: 'url('+ item.coverImage +')'}"></view>
				<view class="back" @click="back" :style="{backgroundColor: backColor}">
					<view class="left_icon"></view>歌单
				</view>
				<view class="details">
					<image :src="item.coverImage" mode="scaleToFill" class="img"></image>
					<view class="footer">
						<text class="name">{{item.name}}</text>
						<text class="desc" v-html="item.desc"></text>
						<view class="sc" v-if="item.id">收藏</view>
					</view>
				</view>
			</view>
			<view class="list_group" id="listGroup">
				<view class="list">
					<view class="list_item" v-for="(item, index) in dataArr" :key="index">
						<view class="list_item_add" @click="e => addToSongList(e, item)" v-if="!item.isPush"></view>
						<uni-icons custom-prefix="iconfont" type="icon-bofangzhong" v-if="item.isPush" class="list_item_none"></uni-icons>
						<image :src="item.coverImage" class="list_item_img" @click="openMusic(item)"></image>
						<view class="list_item_content" @click="openMusic(item)">
							<text class="name">{{item.name}}</text>
							<text class="artist">{{item.singer}}</text>
						</view>
						<view class="list_item_utils"></view>
					</view>
				</view>
			</view>
		</scroll-view>

		<playGroup style="bottom: 0"></playGroup>

		<view class="add_item_group" v-for="(item, index) in addList" :key="index" :style="{top: item.top, left: item.left}" :animation="animationData">
			<view class="add_item"  :animation="animationData1"></view>
		</view>

		<aui-loading ref="loading" :type="auiLoading.type" :direction="auiLoading.row" :msg="auiLoading.msg"
			:mask="auiLoading.mask"></aui-loading>
	</view>
</template>

<script>
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	import playGroup from '@/pages/home/components/playGroup.vue';
	import audio from '@/mixins/audio'
	// 歌单详情页面
	export default {
		extends: audio,
		components: {
			auiLoading,
			playGroup
		},
		data() {
			return {
				item: {},
				addList: [], // 储存添加动画
				conWidth: 0,
				conHeight: 0,
				dataArr: [],
				listGroupTop: 0,
				backColor: 'transparent',
				auiLoading: {
					type: 3,
					direction: 'col',
					msg: '加载中',
					mask: false
				},
				animationData: {},
				animationData1: {},
				animation:null,
				animation1: null,
			}
		},
		methods: {
			initAnimation(top){
				this.animation = uni.createAnimation()
				this.animation1 = uni.createAnimation()
				this.animationData = this.animation.translateX(this.conWidth + 'px').step({
					duration: 880,
					timingFunction: 'linear'
				}).export();
				
				this.animationData1 = this.animation1.translateY('-100px').step({
					duration: 220,
					timingFunction: 'linear'
				}).translateY('0px').step({
					duration: 220,
					timingFunction: 'linear'
				}).translateY((this.conHeight - top) / 2 + 'px').step({
					duration: 220,
					timingFunction: 'linear'
				}).translateY((this.conHeight - top) + 'px').step({
					duration: 220,
					timingFunction: 'linear'
				}).opacity(0).step().export();
			},
			addToSongList(e, item) {
				if(this.playList.some(el => el.id === item.id)){
					uni.showToast({
						icon: 'none',
					    title: '请勿重复添加',
					    duration: 2000
					});
				} else {
					item.isPush = true;
					let obj = {
						...item,
						left: e.target.x + 'px',
						top: e.target.y + 'px'
					}
					this.initAnimation(e.target.y)
					this.addList.push(obj);
					this.playList.push(item);
					this.setPlayList(this.playList)
				}
			},
			back() {
				uni.navigateBack()
			},
			scroll(event) {
				if (event.detail.scrollTop > this.listGroupTop) {
					this.backColor = "#ebebea"
				} else {
					this.backColor = 'transparent'
				}
			},
			openMusic(item) {
				this.$refs.loading.show()
				if (!this.playList.some(el => el.id === item.id)) {
					this.playList.push(item);
					this.setMusic(this.playList.length - 1, {}, () => {
						this.setPlayState(true)
						this.$refs.loading.hide()
					})
				} else {
					let index = this.playList.findIndex(el => el.id === item.id);
					this.setMusic(index, {}, () => {
						this.$refs.loading.hide()
					});
				}
			}
		},
		onLoad(option) {
			this.$nextTick(() => {
				this.$refs.loading.show()
				const item = JSON.parse(decodeURIComponent(option.item));
				this.$api.getSongListDetails(item).then(res => {
					this.item = res;
					this.item.desc = this.item.desc.replace(/(<br>)+/g, '<br>')
					this.item.desc = this.item.desc.replace(/[(^<br>) | (<br>$)]/g, '')
					// 判断当前播放列表内是否存在
					this.dataArr = this.item.musicList
					this.dataArr = this.dataArr.map(el => {
						if(this.playList.some(item => item.id === el.id)) {
							el.isPush = true;
						} else {
							el.isPush = false;
						}
						return el
					});
					this.dataArr.forEach(music => {
						try {
							this.getMusicOtherInfo(music).then(musicResult => {
								music.coverImage = musicResult;
							})
						} catch (e) {}

					})
					this.$refs.loading.hide()
				}).catch(() => {
					this.$refs.loading.hide()
				})
			})
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#listGroup').boundingClientRect(data => {
				this.listGroupTop = data.top
			}).exec();

			const query1 = uni.createSelectorQuery().in(this);
			query1.select('#scrollGroup').boundingClientRect(data => {
				this.conWidth = data.width - 60;
				this.conHeight = data.height - 30;
			}).exec();
			
			// 当播放列表内删除歌曲时恢复列表添加功能
			uni.$on('removeMusic', (music) => {
				let index =this.dataArr.findIndex(el => el.id === music.id);
				let obj = this.dataArr[index];
				obj.isPush = false;
				this.$set(this.dataArr, index, obj);
			})
		}
	}
</script>

<style lang="less">
	.add_item_group{
		position: fixed;
		.add_item {
			background-image: url('@/static/icon/add.png');
			background-size: 100% 100%;
			background-repeat: no-repeat;
			width: 30rpx;
			height: 30rpx;
		}
	}

	.scrollGroup {
		height: 100vh;
		width: 100vw;
		overflow-y: auto;
		box-sizing: border-box;
	}

	.title_group {
		position: relative;

		.bg_img {
			position: absolute;
			display: block;
			width: 100vw;
			height: 600rpx;
			background-size: 600% 600%;
			background-repeat: no-repeat;
			filter: blur(260rpx);
			z-index: -1;
		}

		.back {
			font-size: 32rpx;
			font-weight: 600;
			display: flex;
			align-items: center;
			padding: 20rpx 28rpx;
			color: #000000;
			position: fixed;
			top: var(--status-bar-height);
			width: 100vw;
			z-index: 100;
			transition: all 0.5s;

			.left_icon {
				width: 24rpx;
				height: 32rpx;
				margin-right: 28rpx;
				background-image: url('@/static/icon/back.png');
				background-repeat: no-repeat;
				background-size: cover;
			}
		}

		.details {
			padding: 50rpx 35rpx;
			display: flex;
			align-items: flex-start;
			margin-top: 60rpx;

			.img {
				width: 212rpx;
				height: 212rpx;
			}

			.footer {
				max-width: calc(100vw - 300rpx);
				margin-left: 28rpx;
				flex: 1;

				.name {
					font-size: 30rpx;
					font-weight: 600;
					display: block;
					color: #000000;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.desc {
					display: block;
					margin-top: 40rpx;
					font-size: 24rpx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 4;
					line-clamp: 4;
					-webkit-box-orient: vertical;
				}

				.sc {
					margin-top: 30rpx;
					display: inline-block;
					font-size: 22rpx;
					color: #000000;
					padding: 20rpx 30rpx;
					border-radius: 15rpx;
					background-color: #dbddda;
					text-align: center;
					line-height: 22rpx;
				}
			}
		}
	}

	.list_group {
		position: absolute;
		top: 500rpx;
		left: 0;
		background-color: #ffffff;
		border-radius: 15px 15px 0 0;
		width: 100vw;
	}

	.list_group.fiexd {
		position: fixed;
		top: 0;
		overflow-y: auto;
		height: calc(100vh - var(--status-bar-height));
	}

	.list {
		padding-bottom: 110rpx;

		.list_item {
			padding: 30rpx 28rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;

			&_add {
				background-image: url('@/static/icon/add.png');
				background-size: 100% 100%;
				background-repeat: no-repeat;
				width: 30rpx;
				height: 30rpx;
				margin-right: 28rpx
			}
			
			&_none {
				width: 30rpx;
				height: 30rpx;
				margin-right: 28rpx
			}

			&_img {
				width: 63rpx;
				height: 63rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
				background-image: url('@/static/icon/detail_img.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}

			&_content {
				flex: 1;
				font-size: 26rpx;
				color: #009ae7;
				line-height: 26rpx;
				display: flex;
				flex-direction: column;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;

				.artist {
					font-size: 20rpx;
					color: #787b83;
					margin-top: 12rpx;
				}
			}

			&_utils {
				background-image: url('@/static/icon/gengduo.png');
				background-size: 100% 100%;
				background-repeat: no-repeat;
				width: 10rpx;
				height: 18rpx;
			}
		}
	}
</style>
