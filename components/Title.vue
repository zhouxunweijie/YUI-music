<template>
	<view>
		<view class="songListGroup">
			<view class="songListGroupTitle">
				<text class="name">{{item.name}}</text>
				<view class="more" @click="goList(item)">更多<image src="../static/icon/jiantou.png" mode="" class="img"></image></view>
			</view>
			<view class="song_container">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Title",
		props:{
			item: Object
		},
		data() {
			return {
				
			};
		},
		methods: {
			goList(item) {
				uni.navigateTo({
					url: "/pages/song/song?item=" + encodeURIComponent(JSON.stringify(item)),
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style lang="less">
.songListGroup{
	padding: 20rpx 30rpx 0;
	box-sizing: border-box;
	&Title{
		font-size: 28rpx;
		color: #101010;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.more{
			color: #cbcbcb;
			display: flex;
			font-size: 22rpx;
			align-items: center;
			border: 2rpx solid #cbcbcb;
			border-radius: 35rpx;
			padding: 5rpx 10rpx;
			.img{
				width: 22rpx;
				height: 22rpx;
			}
		}
	}
	.song_container{
		padding-top: 28rpx;
		box-sizing: border-box;
	}
}
</style>
