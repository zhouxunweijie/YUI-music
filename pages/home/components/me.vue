<template>
	<view class="container">
	  <view class="status_bar">
		  <!-- 这里是状态栏 -->
	  </view>
	  
	  <!-- 歌单列表 -->
	  <view class="group" @click="open">
		<view class="group_title">
			<text class="text">我的歌单(13个)</text>
			<image src="@/static/icon/add.png" class="group_utils"></image>
		</view>
		
		<view class="song_list">
			<view class="song_list_item">
				<image src="@/static/10-e691107df16746d4a9f3fe9496fd1848.jpg"  class="song_list_item_img"></image>
				<view class="song_list_item_name">
					<text class="text name">我最爱的</text>
					<text class="text">12首</text>
				</view>
			</view>
			<view class="song_list_item">
				<image src="@/static/10-e691107df16746d4a9f3fe9496fd1848.jpg"  class="song_list_item_img"></image>
				<view class="song_list_item_name">
					<text class="text name">我最爱的</text>
					<text class="text">12首</text>
				</view>
			</view>
		</view>
	  </view>
	  
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			
		},
		methods: {
			open(){
				const subNVue = uni.getSubNVueById('popup');
				subNVue.show()
			}
		}
	}
</script>

<style lang="less" scoped>
.group{
	background-color: #fff;
	border-radius: 8rpx;
	padding: 20rpx 30rpx;
	.group_title{
		display: flex;
		align-items: center;
		justify-content:space-between;
		.text{
			color: #999999;
			font-size: 21rpx;
			line-height: 21rpx;
			float: left;
			text-spacing: 1;
		}
		.group_utils{
			float: right;
			width: 36rpx;
			height: 36rpx;
		}
	}
}
.song_list{
	&_item{
		margin-top: 18rpx;
		display: flex;
		&_img{
			width: 90rpx;
			height: 90rpx;
			border-radius: 8rpx;
		}
		&_name{
			padding-left: 20rpx;
			.text{
				font-size: 28rpx;
				color: #959595;
				display: block;
				&.name{
					color: #171717;
				}
			}
		}
	}
}

.container{
	height: 100vh
}
</style>
