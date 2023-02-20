<template>
	<view>
		<Search :disabled="true" @click.native="openSearch"/>
		<view class="content">
			<Title  v-for="(item, index) in sourceConfig" :key="index" :item="item">
				<view class="item_group">
					<view class="item" v-for="(el, i) in item.list" :key="i" @click="goDetails(el)">
						<view class="item_img" :style="{backgroundImage: 'url('+ el.coverImage +')'}">
							<!-- <view class="bfl"><image src="../../../static/icon/play1.png" class="bfl_icon"></image>28ä¸/view> -->
							<image src="../../../static/icon/play1.png" class="bf"></image>
						</view>
						<text class="name">{{el.name}}</text>
					</view>
				</view>
			</Title>
		</view>
	</view>
</template>

<script>
	import mixin from "@/mixins/playStore.js";
	import Search from '@/components/search';
	import Title from '@/components/Title';
	import {sourceConfig} from '@/core/playMode.js';
	export default {
		extends: mixin,
		data(){
			let arr = Object.keys(sourceConfig)
			let obj = Object.assign(sourceConfig);
			arr.forEach(e => obj[e].list = []);
			return {
				searchValue: '',
				dataArr: [],
				sourceConfig: obj
			}
		},
		components: {
			Search,
			Title
		},
		mounted(){
			let playList = Object.keys(sourceConfig);
			playList.forEach(item => {
				this.$api.getSongListGroup(item,{
					offset: 1
				}).then(res => {
					this.sourceConfig[item].list = res.splice(0, 6);
				})
			})

		},
		methods:{
			openSearch(){
				// uni.navigateTo({
				// 	url: "/pages/search/search",
				// 	animationType: 'slide-in-right',
				// 	animationDuration: 200
				// })
				this.$emit('openSearch')
			},
			goDetails(item){
				uni.navigateTo({
					url: "/pages/songList/songList?item=" + encodeURIComponent(JSON.stringify(item)),
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style lang="less">
	.content{
		height: calc(100vh - 200rpx);
		box-sizing: border-box;
		overflow: auto;
		padding-bottom: 120rpx;
	}
	.item_group{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
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
	
</style>
