<template>
	<view class="">
		<Search isLeft @confirm="confirm" @searchBtn="searchBtn" v-model="searchValue" @back="back"/>
		<view class="appList">
			<view class="appList_item" v-for="(item, index) in applist" :key="index" @click="selectItem(item, index)">
				<image :src="showIndex === index ? item.icon : item.icon_h" class="image"></image>
				<text class="text" :class="{'active': showIndex === index}">{{item.name}}</text>
			</view>
		</view>
		<view class="list">
			<view class="list_item" v-for="(item, index) in dataArr" :key="index" @click="openDetails(item)">
				<view class="list_item_add"></view>
				<view class="list_item_content">
					<text>{{item.name}}</text>
					<text class="artist">{{item.singer}}</text>
				</view>
				<view class="list_item_utils"></view>
			</view>
		</view>
		
		<aui-loading ref="loading" :type="auiLoading.type" :direction="auiLoading.row" :msg="auiLoading.msg"
			:mask="auiLoading.mask"></aui-loading>
	</view>
</template>

<script>
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	import Search from '@/components/search';
	import {sourceConfig} from '@/core/playMode.js';
	import Apis from '@/apis/index.js';
	import audio from '@/mixins/audio';
	export default {
		extends:audio,
		props: {
			show: Function,
			hide: Function
		},
		components:{
			Search,
			auiLoading
		},
		data(){
			return {
				dataArr: [],
				showIndex: 0, // 默认展示搜索
				searchName: 'wyy', // 搜索引擎  默认使用网易云
				searchValue: "青春",
				auiLoading: {
					type: 3,
					direction: 'col',
					msg: '加载中',
					mask: false
				},
				applist: [
					{
						...sourceConfig.wyy,
						icon: require('@/static/icon/wyy.png'),
						icon_h: require('@/static/icon/wyy_h.png')
					},
					{
						...sourceConfig.kugou,
						icon: require('@/static/icon/kugou.png'),
						icon_h: require('@/static/icon/kugou_h.png')
					},
					{
						...sourceConfig.kuwo,
						icon: require('@/static/icon/kuwo.png'),
						icon_h: require('@/static/icon/kuwo_h.png')
					},
					{
						...sourceConfig.qq,
						icon: require('@/static/icon/qq.png'),
						icon_h: require('@/static/icon/qq_h.png')
					},
					// {
					// 	...sourceConfig.migu,
					// 	icon: require('@/static/icon/migu.png'),
					// 	icon_h: require('@/static/icon/migu_h.png')
					// }
				]
			}
		},
		methods:{
			// 选择搜索引擎
			selectItem(item, index){
				this.searchName = item.platform;
				this.showIndex = index;
				this.confirm(this.searchValue)
			},
			openDetails(item){
				this.$refs.loading.show()
				if(!this.playList.some(el => el.id === item.id)){
					this.playList.push(item);
					this.setPlayList(this.playList)
					this.setMusic(this.playList.length - 1, {}, () => {
						this.$refs.loading.hide()
					})
				} else {
					let index = this.playList.findIndex(el => el.id === item.id);
					this.setMusic(index, {}, () => {
						this.$refs.loading.hide()
					});
				}
			},
			searchBtn(){
				this.confirm(this.searchValue)
			},
			async confirm(value){
				if(value) {
					this.show()
					this.dataArr = await Apis.search(this.searchName, {
						key: value
					})
					this.hide()
				}
			},
			back(){
				this.$emit('back')
			}
		}
	}
</script>

<style lang="less">
	.appList{
		display: flex;
		.appList_item{
			width: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.image{
				width: 72rpx;
				height: 72rpx;
			}
			.text{
				font-size: 18rpx;
				color: #bfbfbf;
				margin-top: 20rpx;
			}
			.text.active{
				color: #010101;
			}
		}
	}
	.list{
		height: calc(100vh - 240rpx - var(--status-bar-height));
		overflow-y: auto;
		width: 100vw;
		.list_item{
			padding: 30rpx 28rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			&_add{
				background-image: url('@/static/icon/add.png');
				background-size: 100% 100%;
				background-repeat: no-repeat;
				width: 30rpx;
				height: 30rpx;
				margin-right: 28rpx
			}
			&_content{
				flex: 1;
				font-size: 26rpx;
				color: #009ae7;
				line-height: 26rpx;
				display: flex;
				flex-direction: column;
				.artist{
					font-size: 20rpx;
					color: #787b83;
					margin-top: 12rpx;
				}
			}
			&_utils{
				background-image: url('@/static/icon/gengduo.png');
				background-size: 100% 100%;
				background-repeat: no-repeat;
				width: 10rpx;
				height: 18rpx;
			}
		}
	}
	
</style>
