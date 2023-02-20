<template>
	<view class="play_group">
		<view class="footer">
			<image v-if="music.coverImage":src="music.coverImage" class="play_avater" :class="{'play': playState}"  @click="goMusicDetails"></image>
			<image v-else src="../../../static/icon/music.png" class="play_avater" ></image>
			<view class="play_text" ref="play_text" id="play_text"  @click="goMusicDetails">
				<view class="play_text_content" ref="play_text_content" id="play_text_content">
					<text v-if="!isShow" class="text">{{music.name || '想好听什么歌了吗？'}}</text>
					<uni-notice-bar class="bar_text" backgroundColor="#ffffff" :speed="50" v-if="isShow"
						scrollable="true" single="true" color="#000000" :text="music.name"></uni-notice-bar>
				</view>
			</view>
			<view class="icon">
				<image v-show="!playState" src="../../../static/icon/play.png" mode="" class="img"  @click="play"></image>
				<image v-show="playState" src="../../../static/icon/suspend.png" mode="" class="img" @click="pause"></image>
			</view>
			<view class="icon">
				<image src="../../../static/icon/playList.png" mode="" class="img" @click="openPopup"></image>
			</view>
		</view>
		<!-- <text id="playName" class="test">{{playName}}</text> -->
		<!-- <progress :percent="progress" activeColor="#00abff" active stroke-width="1" /> -->

		<uni-popup ref="popup" type="bottom">
			<scroll-view class="popup_content" scroll-y="true">
				<view class="list">
					<view class="list_item"  v-for="(item, index) in playList" :key="index" :class="{'active': index === playIndex}" >
						<image :src="item.coverImage" class="avater" @tap="openMusic(item, index)"></image>
						<view class="name" @tap="openMusic(item, index)">
							<text class="text">{{item.name}}</text>
							<text class="text">{{item.singer}}</text>
						</view>
						<uni-icons v-if="playIndex == index && item.isLike" type="heart-filled" class="heart" color="#F56C6C" size="24" @tap="heartFilled(item, index)"></uni-icons>
						<uni-icons v-if="playIndex == index && !item.isLike" type="heart" class="heart" size="24" @tap="heart(item, index)"></uni-icons>
						<uni-icons custom-prefix="iconfont" type="icon-guanbi" size="24" @tap="removeMusic(item, index)"></uni-icons>
					</view>
				</view>
			</scroll-view>
		</uni-popup>
	</view>
</template>

<script>
	import audio from "@/mixins/audio.js"
	export default {
		extends: audio,
		data() {
			return {
				groupWidth: 0,
				conWidth: 0,
				style: null,
				isShow: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				defaultMusic: '../../../static/icon/music.png'
			}
		},
		computed: {
			music() {
				return this.playList[this.playIndex] || {}
			}
		},
		methods: {
			// 取消喜欢
			heartFilled(item, index){
				item.isLike = false
			},
			// 喜欢
			heart(item, index){
				item.isLike = true
			},
			removeMusic(item, index) {
				let i = index + 1;
				// 删除当前播放歌曲
				if (this.playIndex === index) {
					// 当前播放歌曲是最后一首
					if(i >= this.playList.length - 1) {
						this.setMusic(0, {}, () => {})
					} else {
						this.setMusic(i, {}, () => {})
					}
				}
				this.playList.splice(index, 1);
				uni.$emit('removeMusic', item);
				
			},
			openMusic(item, index) {
				this.setMusic(index,{}, () => {});
			},
			// 打开音乐播放列表
			openPopup() {
				this.$refs.popup.open('bottom')
			},
			// 初始化歌曲名称是否滚动
			initPlayText() {
				this.isShow = false;
				// const query = uni.createSelectorQuery().in(this);
				// query.select('#play_text').boundingClientRect(data => {
				// 	this.groupWidth = data.width
				// }).exec();
				// const query2 = uni.createSelectorQuery().in(this);
				// query2.select('#playName').boundingClientRect(data => {
				// 	console.log(data, 'data')
				// 	this.conWidth = data.width
				// }).exec();
				// this.$nextTick(() => {
				// 	console.log(this.groupWidth , this.conWidth)
				// 	if (this.groupWidth < this.conWidth) {
				// 		this.isShow = true
				// 	}
				// })
			},
			// 开始/暂停事件
			playClick() {
				if (this.Audio.src) {
					if (this.playState) {
						this.pause()
					} else {
						this.play()
					}
				} else {
					this.setMusic(this.playIndex, {}, () => {})
				}

			},
			goMusicDetails(){
				uni.navigateTo({
					url: "/pages/musicDetails/index",
					animationType: 'slide-in-bottom',
					animationDuration: 300
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.play_group {
		position: absolute;
		bottom: 100rpx;
		left: 0;
		width: 100vw;

		height: 80rpx;
		background-color: #fcfcfc;

		padding: 8rpx 30rpx 0rpx;
		box-sizing: border-box;

		.footer {
			display: flex;
			align-items: center;

			.play_avater {
				width: 66rpx;
				height: 66rpx;
				border-radius: 50%;
			}

			.play_avater.play {
				animation: rotate linear 30s;
			}

			.play_text {
				.play_text_content {
					animation: 50s wordsLoop linear infinite normal;

					.bar_text {
						display: block;
						width: 100%;
						height: 66rpx;
						margin-bottom: 0;
					}
				}

				margin: 0 15rpx;
				font-size: 24rpx;
				color: #202020;
				flex: 1;
				width: calc(100% - 286rpx);
				white-space: nowrap;
				overflow: hidden;
				letter-spacing: 1px;
			}
		}
	}

	.icon {
		width: 50rpx;
		height: 50rpx;
		margin-left: 45rpx;

		.img {
			width: 100%;
			height: 100%
		}
	}

	.test {
		font-size: 24rpx;
		white-space: nowrap;
		letter-spacing: 1px;
		visibility: hidden;
	}

	.popup_content {
		height: 80vh;
		width: 100%;
		background-color: #ffffff;
		border-radius: 20rpx 20rpx 0 0;

		.list {
			padding: 28rpx 0;

			.list_item {
				color: #000000;
				padding: 10rpx 20rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				position: relative;
				.avater {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.name {
					padding: 0 14rpx;
					font-size: 24rpx;
					flex: 1;

					.text {
						display: block;
					}
				}
				.heart{
					margin-right: 20rpx;
				}
			}

			.list_item.active {
				color: #078bf1;
				background-color: #fbfaff;
			}
		}
	}
</style>
