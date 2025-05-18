<template>
	<view class="classLayout pageBg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item v-for="item in classifyList" 
			:key="item._id"
			:item="item"></theme-item>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { apigetClassify } from '../../api/api'; 
import {onShareAppMessage,onShareTimeline} from '@dcloudio/uni-app'

const classifyList = ref([]);

//获取分类页面网络请求
const getClassify = async()=>{
	let res =await apigetClassify({
		pageSize:15
	});
	classifyList.value = res.data
	console.log(classifyList.value)
}

//分享给好友
onShareAppMessage((e)=>{
	return {
		title:"wallpaper",
		path:"/pages/classify/classify"
	}
})

//分享朋友圈
onShareTimeline(()=>{
	return {
		title:"wallpapers"
	}
})
getClassify();
</script>

<style lang="scss" scoped>
.classify{
	padding: 30rpx;
	display: grid;
	grid-template-columns: repeat(3,1fr);
	gap: 15rpx;
}
</style>
