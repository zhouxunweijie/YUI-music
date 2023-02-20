<template>
  <view class="tabbar">
	<view class="tabbar_item" v-for="(item, index) in tabBarList" :key="index" @click="tabClick(index)">
		<image :src="tabIndex === index ? item.selectedIcon : item.icon" class="img"></image>
		<text class="text" :class="{'active': tabIndex === index}">{{item.text}}</text>
	</view>
  </view>
</template>

<script>
	export default {
		name:"TabBar",
		data() {
			return {
				tabBarList: [
					{
						icon: require("@/static/icon/home.png"),
						selectedIcon: require("@/static/icon/home_active.png"),
						text: '音乐库'
					},
					{
						icon: require("@/static/icon/me.png"),
						selectedIcon: require("@/static/icon/me_active.png"),
						text: '我的'
					}
				],
				tabIndex: 0
			};
		},
		methods: {
			tabClick(index) {
				this.tabIndex = index;
				this.$emit('tabChange', index)
			}
		}
	}
</script>

<style lang="less" scoped>
.tabbar{
	position: absolute;
	bottom: var(--window-bottom);
	left: 0;
	width: 100vw;
	height: 100rpx;
	display: flex;
	align-items: center;
	background-color: #fff;
	&_item{
		width: 50%;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 10rpx 0;
		.img{
			width: 52rpx;
			height: 52rpx;
		}
		.text{
			font-size: 18rpx;
			line-height: 18rpx;
			color: #8e8e8e;
			margin-top: 10rpx;
			&.active{
				color: #333333
			}
		}
	}
}
</style>
