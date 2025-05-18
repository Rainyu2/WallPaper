<template>
	<view class="themeItem">
		<navigator :url="'/pages/classlist/classlist?id='+item._id+'&name='+item.name" 
		class="box" v-if="!isMore">
			<image :src="item.picurl" mode="aspectFill" class="pic"></image>
			<view class="mask">{{item.name}}</view>
			<view class="tab" v-if="formatTimeAgo(item.updateTime)">{{formatTimeAgo(item.updateTime)}}前更新</view>
		</navigator>
		
		<navigator open-type="reLaunch" url="/pages/classify/classify" class="box more" v-if="isMore">
			<image src="/common/images/more.jpg" mode="" class="pic"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>7569  
		</navigator>
	</view>
</template>

<script setup>
import {formatTimeAgo} from '@/utils/common.js'

//声明index页面网络请求所传值
defineProps({
	isMore:{
		type:Boolean,
		default:false
	},
	item:{
		type:Object,
		default(){
			return{
				name:"默认名称",
				picurl:"/common/images/classify1.jpg",
				updateTime:Date.now() - 1000*60*60*24
			}
		}
	}
})
</script>

<style lang="scss">
.themeItem{
	.box{
		height: 340rpx;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		.pic{
			width: 100%;
			height: 100%;
		}
		.mask{
			width: 100%;
			height: 70rpx;
			font-size: 30rpx;
			position: absolute;
			bottom: 0;
			left: 0;
			background: rgba(0, 0, 0, 0.2);
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			backdrop-filter: blur(20rpx); //磨砂半透明效果
			font-weight: 600;
		}
		.tab{
			position: absolute;
			left: 0;
			top:0;
			background: rgba(250, 129, 90, 0.7);
			backdrop-filter: blur(20rpx);
			color: #fff;
			font-size: 22rpx;
			padding: 6rpx 14rpx;
			border-radius: 0 0 20rpx 0;
			transform: scale(0.8); //按比例缩放
			transform-origin: left; //以左上角为目标缩放
		}
	}
	.box.more{
		.mask{
			width: 100%;
			height: 100%;
			flex-direction: column;
		}
		.text{
			font-size: 28rpx;
		}
	}
}
</style>