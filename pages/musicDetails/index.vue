<template>
	<view class="content">
	  <view class="header">
	  	<image src="@/static/icon/down.png" mode="" class="down" @click="close"></image>
		<text class="playName">{{music.name}}</text>
	  </view>
	  
	  <image :src="music.coverImage" class="image"></image>
	  <view class="lry">
		  <bingLyric :curTime="playSeconds" :areaStyle="areaStyle" :lyrics="lrcs" :lyricStyle="lyricStyle" :centerStyle="centerStyle" @centerBtnClick="centerBtnClick"></bingLyric>
	  </view>
	  
	  <view class="playFooter" id="playFooter">
		  <view class="playHeader">
		  	<uni-icons custom-prefix="iconfont" type="icon-shoucang-yishoucang" size="30"></uni-icons>
			<uni-icons custom-prefix="iconfont" type="icon-gengduo" size="30"></uni-icons>
		  </view>
		  
		  <!-- 进度条 -->
		  <view class="progressGroup">
			  <text class="time">{{playDuration}}</text>
			  <slider v-model="progress" block-size="12" line-size="2" class="progress"></slider>
			  <text class="time">{{totalDuration}}</text>
		  </view>
		  
		  <!-- 播放控制器 -->
	  	<view class="playUtils">
			<view>
				<uni-icons custom-prefix="iconfont" type="icon-xunhuanbofang" size="30"></uni-icons>
			</view>
			<view>
				<uni-icons custom-prefix="iconfont" type="icon-shangyiqu" size="38" @click="prev"></uni-icons>
				<uni-icons custom-prefix="iconfont" type="icon-bofangyinle" size="45" class="play"  v-show="!playState" @click="play"></uni-icons>
				<uni-icons custom-prefix="iconfont" type="icon-a-zantingyinle" class="play" size="45" v-show="playState"  @click="pause"></uni-icons>
				<uni-icons custom-prefix="iconfont" type="icon-xiayiqu" size="38" @click="next"></uni-icons>
			</view>
			<view>
				<uni-icons custom-prefix="iconfont" type="icon-bofangliebiao" size="30"></uni-icons>
			</view>
		</view>
	  </view>
	  
	</view>
</template>

<script>
	import audio from "@/mixins/audio.js";
	import slider from '@/components/ly-drag-slider/dc-slider.vue';
	import bingLyric from '@/components/bing-lyric/bing-lyric.vue';
	export default {
		extends:audio,
		components: {
			slider,
			bingLyric
		},
		computed: {
			music(){
				return this.playList[this.playIndex] || {}
			}
		},
		data() {
			return {
				title: 'Hello',
				areaStyle: {height: '100%', width: '100%', background: 'transparent'},
				centerStyle: {btnText: '播放'},
				lyricStyle: {
					color: '#fff',
					activeColor: '#00aaff'
				},
				curTime: 0
			}
		},
		methods: {
			open(){
				const subNVue = uni.getSubNVueById('popup');
				subNVue.show()
			},
			close(){
				uni.navigateBack()
			},
			// 选中歌词点击播放
			centerBtnClick(obj){
				this.Audio.seek(obj.centerTime)
			}
		}
	}
</script>

<style lang="less" scoped>

.content{
	height: 100vh;
	background-color: #0e2024;
	position: relative;
	.header{
		height: 88rpx;
		position: absolute;
		top: var(--status-bar-height);
		left: 0;
		padding: 0rpx 45rpx;
		box-sizing: border-box;
		width: 100%;
		.down{
			position: absolute;
			left: 45rpx;
			top: 50%;
			transform: translateY(-50%);
			width: 36rpx;
			height: 36rpx;
		}
		.playName{
			display: block;
			width: 100%;
			line-height: 88rpx;
			height: 88rpx;
			text-align: center;
			font-size: 26rpx;
			font-weight: 600;
			color: #ffffff;
		}
	}
}

.image{
	  position: absolute;
	  top: calc(var(--status-bar-height) + 138rpx);
	  width: 30vw;
	  height: 30vw;
	  left: 50%;
	  transform: translateX(-50%);
}

.lry{
	position: absolute;
	left: 0;
	top: calc(var(--status-bar-height) + 138rpx + 35vw);
	width: 100%;
	height: calc(100vh - (var(--status-bar-height) + 138rpx + 35vw + 300rpx));
	color: #fff;
	font-size: 24rpx;
	overflow: auto;
	padding: 0 100rpx;
	box-sizing: border-box;
}

.playFooter{
	position: absolute;
	bottom: 50rpx;
	left: 0;
	width: 100%;
	padding: 0 45rpx;
	box-sizing: border-box;
	
	.playHeader{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.progressGroup{
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #ffffff;
		margin: 30rpx 0;
		.progress{
			width: calc(100% - 200rpx);
			margin: 0;
		}
	}
	
	.playUtils{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.play{
			margin: 0 10vw;
		}
	}
}
</style>
