<template>
	<view class="search_group">
		<view class="left_icon" v-if="isLeft" @click="back"></view>
		<view class="input_group">
			<view class="input_icon"></view>
			<input type="text" 
				:value="value" 
				placeholder="请输入您要搜索的歌曲名称" 
				confirm-type="search" 
				@confirm="confirm"
				@input="input"
				class="input" 
				:disabled="disabled"/>
		</view>
		<view class="right_text" @click="$emit('searchBtn')">搜索</view>
	</view>
</template>

<script>
	export default {
		name:"search",
		props: {
			isLeft: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			value: {
				type: String
			}
		},
		methods:{
			back(){
				this.$emit('back')
			},
			confirm($event){
				this.$emit('confirm', $event.target.value)
			},
			input($event){
				this.$emit('input', $event.target.value)
			}
		}
	}
</script>

<style lang="less">
.search_group{
	width: 100vw;
	padding: 20rpx 28rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	font-size: 24rpx;
	line-height: 24rpx;
	color: #010101;
	.left_icon{
		width: 24rpx;
		height: 32rpx;
		margin-right: 40rpx;
		background-image: url('@/static/icon/back.png');
		background-repeat: no-repeat;
		background-size: cover;
	}
	.input_group{
		flex: 1;
		background-color: #f3f3f5;
		border-radius: 15rpx;
		height: 54rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		.input_icon{
			width: 28rpx;
			height: 28rpx;
			margin-right: 12rpx;
			background-image: url('@/static/icon/search.png');
			background-repeat: no-repeat;
			background-size: cover;
		}
		input::placeholder{
			
		}
	}
	.right_text{
		margin-left: 40rpx;
	}
}
</style>
