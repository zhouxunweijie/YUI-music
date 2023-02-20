<template>
	<view class="container_body">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<uni-transition mode-class="slide-right" :show="tabIndex === 0 && isShow" @change="change" refs="Search">
			<Search @back="isShow = false" :show="show" :hide="hide"></Search>
		</uni-transition>
		<Home @openSearch="isShow = true" v-show="tabIndex === 0 && !isShow"></Home>
		<me v-show="tabIndex === 1"></me>
		<playGroup></playGroup>
		<TabBar @tabChange="tabChange"></TabBar>
		
		<aui-loading
			ref="loading"
		  :type="auiLoading.type" 
		  :direction="auiLoading.row" 
		  :msg="auiLoading.msg" 
		  :mask="auiLoading.mask"
		></aui-loading>
	</view>
</template>

<script>
	import TabBar from './components/TabBar.vue';
	import playGroup from './components/playGroup.vue';
	import Home from './components/home.vue';
	import me from './components/me.vue';
	import playStore from '@/mixins/playStore';
	import Search from './components/search.vue'
	import auiLoading from '@/components/aui-loading/aui-loading.vue';
	export default {
		extends:playStore,
		components:{
			TabBar,
			playGroup,
			Home,
			me,
			Search,
			auiLoading
		},
		computed:{
			isPlayGroup(){
				if(this.playList && this.playList.length > 0 && this.playIndex > -1) {
					return true
				}
				return false
			}
		},
		data() {
			return {
				title: 'Hello',
				isShow: false,
				tabIndex: 0,
				auiLoading: {
					type: 3,
					direction: 'col',
					msg: '加载中',
					mask: false
				},
			}
		},
		mounted(){
			console.log(this.playIndex, 'playIndex')
			console.log(this.playList, 'playList')
		},
		methods: {
			tabChange(index){
				if(index === 0) {
					this.isShow = false;
				}
				this.tabIndex = index;
			},
			open(){
				// const subNVue = uni.getSubNVueById('popup');
				// subNVue.show()
			},
			change(){
				
			},
			show(){
				this.$refs.loading.show()
			},
			hide(){
				this.$refs.loading.hide()
			}
		}
	}
</script>

<style lang="less" scoped>
.container_body{
	min-height: calc(100vh - (180rpx + var(--window-bottom)));
	overflow: auto;
	overflow-x: hidden;
	width: 100vw;
	box-sizing: border-box;
	background-color: #ffffff;
}


</style>
