<template>
	<!-- 通过对数组长度的访问和noData的布尔值来控制顶部加载组件 -->
	<view class="classList">
		<view class="loadingLayout" v-if="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		
		<view class="content">
			<navigator :url="'/pages/preview/preview?id='+item._id" class="item" 
			v-for="item in classList"
			:key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<!-- 通过对数组长度的访问和noData的布尔值来控制底部下拉刷新组件 -->
		<view class="loadingLayout" v-if="classList.length || noData">
			<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
		</view>
		<!-- 用于小程序端控制底部安全区域 -->
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import  {apiGetClassList,apiGetHistoryList} from '@/api/api.js';
import {gotoHome} from '@/utils/common.js'
import {onLoad,onReachBottom,onShareAppMessage,onShareTimeline,onUnload} from '@dcloudio/uni-app';

//分类列表数据
const classList =ref([]);

const noData = ref(false)
//定义data参数
const queryParams = {
	pageNum:1,
	pageSize:12
}
let pageName;
//在setup语法糖中onLoad的执行顺序晚于自己定义的网络请求函数，所以需要将网络请求函数放在onLoad里
onLoad((e)=>{
	console.log(e);
	let {id=null,name=null,type=null} = e;
	if(type) queryParams.type = type
	if(id) queryParams.classid = id
	// if(!id) gotoHome();
	pageName = name
	uni.setNavigationBarTitle({
		title:name
	})
	getClassList();
})

onReachBottom(()=>{
	if(noData.value) return;
	queryParams.pageNum++;
	getClassList()
})

//获取分类列表网格数据
const getClassList = async()=>{
	//分别选择如果是传的classid就调用获取原分类界面，如果是type类型就调用获取用户分类界面
	let res;
	if(queryParams.classid) res = await apiGetClassList(queryParams);
	if(queryParams.type) res = await apiGetHistoryList(queryParams);
	
	//将新老数据结合以达到可以逐渐加载更多图片效果
	classList.value =[...classList.value, ...res.data];
	if(queryParams.pageSize >res.data.length) noData.value = true
	uni.setStorageSync("storgClassList",classList.value)
	console.log(res.data)
}

//分享给好友
onShareAppMessage((e)=>{
	return {
		title:"wallpaper-"+pageName,
		// 带参数实现个性化页面分享title
		path:"/pages/classlist/classlist?id="+queryParams.classid+"&name="+pageName
	}
})

//分享朋友圈
onShareTimeline(()=>{
	return {
		title:"wallpapers"
	}
})

onUnload(()=>{
	uni.removeStorageSync("storgClassList")
})
</script>

<style lang="scss" scoped>
.classList{
	.content{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 5rpx;
		padding: 5rpx;
		.item{
			height: 440rpx;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>
