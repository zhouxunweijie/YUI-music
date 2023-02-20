<template>
	<view>
		<uni-nav-bar :title="item.name" left-icon="left" fixed @clickLeft="clickLeft"statusBar></uni-nav-bar>
		<view class="item_group">
			<view class="item" v-for="(el, i) in list" :key="i" @click="goDetails(el)">
				<view class="item_img" :style="{backgroundImage: 'url('+ el.coverImage +')'}">
					<!-- <view class="bfl"><image src="../../../static/icon/play1.png" class="bfl_icon"></image>28涓/view> -->
					<image src="@/static/icon/play1.png" class="bf"></image>
				</view>
				<text class="name">{{el.name}}</text>
			</view>
			<uni-load-more :status="more" @clickLoadMore="clickLoadMore" class="more"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {},
				list: [],
				more: "more", //more/loading/noMore
				offset: 1,
			}
		},
		onLoad(option){
			this.item = JSON.parse(decodeURIComponent(option.item));
			this.getData()
		},
		methods: {
			getData(){
				console.log(this.item, '$api')
				this.more = 'loading';
				this.$api.getSongListGroup(this.item.platform,{
					offset: this.offset,
					limit: 21,
				}).then(res => {
					if(res.length < 21) {
						this.more = 'noMore'
					} else {
						this.more = 'more'
					}
					this.list.push(...res);
				})
			},
			goDetails(item){
				uni.navigateTo({
					url: "/pages/songList/songList?item=" + encodeURIComponent(JSON.stringify(item)),
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			},
			clickLeft(){
				uni.navigateBack()
			},
			clickLoadMore(){
				this.offset++;
				this.getData()
			}
		}
	}
</script>

<style lang="less">
.flxed{
	top: var(--status-bar-height)
}
.item_group{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		.item{
			width: calc((100vw - 120rpx) / 3);
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			.item_img{
				background-position: center;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				width: calc((100vw - 120rpx) / 3);
				height: calc((100vw - 120rpx) / 3);
				border-radius: 15rpx;
				position: relative;
				.bfl{
					font-size: 22rpx;
					color: #ffffff;
					position: absolute;
					top: 16rpx;
					right: 18rpx;
					display: flex;
					align-items: center;
					&_icon{
						width: 22rpx;
						height: 22rpx;
						margin-right: 10rpx;
					}
				}
				.bf{
					width: 40rpx;
					height: 40rpx;
					right: 14rpx;
					bottom: 16rpx;
					position: absolute;
				}
			}
			.name{
				font-size: 22rpx;
				line-height: 32rpx;
				padding-top: 10rpx;
				 text-overflow: -o-ellipsis-lastline;
				  overflow: hidden;
				  text-overflow: ellipsis;
				  display: -webkit-box;
				  -webkit-line-clamp: 2;
				  line-clamp: 2;
				  -webkit-box-orient: vertical;
			}
		}
	}
	
	.more{
		width: 100%;
	}
</style>
