<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<view class="banner">
			<swiper circular indicator-dots indicator-color="rgba(255,255,255,0.5)"
			indicator-active-color="#fff" autoplay>
				<swiper-item v-for="item in bannerList" :key="item._id">
					<navigator v-if="item.target == 'miniProgram'" 
					:url="item.url" 
					class="like"
					target="miniProgram"
					:app-id="item.appid"
					>
					<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
					
					<navigator v-else :url="`/pages/classlist/classlist?${item.url}`" class="like">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<swiper-item v-for="item in noticeList" :key="item._id">
						<navigator :url="'/pages/notices/detail?id='+item._id">
							{{item.title}}
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>
		
		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="18"></uni-icons>
						<text class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
						</text>
					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x="true">
					<view class="box" v-for="item in randomList" :key="item._id">
						<image @click="goPreview(item._id)" :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="/pages/classify/classify" open-type="reLaunch" class="more">More+</navigator>
				</template>
			</common-title>
			
			<view class="content">
				<theme-item v-for="item in classifyList" 
				:key="item._id" :item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import {onShareAppMessage,onShareTimeline} from '@dcloudio/uni-app'
import { apiGetBanner,apigetDayRandom,apigetNotice,apigetClassify } from '../../api/api'; 

const bannerList=ref([]);
const randomList=ref([]);
const noticeList=ref([]);
const classifyList=ref([]);

//获取首页头部栏网络请求
const getBanner = async ()=>{
	let res = await apiGetBanner();
	bannerList.value = res.data
}	

//获取每日推荐栏网络请求
const getDayRandom = async ()=>{
	let res=await apigetDayRandom()
	randomList.value = res.data
}

//获取公告栏网络请求
const getNotice  = async ()=>{
	let res=await apigetNotice({select:true})
	noticeList.value = res.data
}

//获取分类页面网络请求
const getClassify = async()=>{
	let res =await apigetClassify({
		select:true
	});
	classifyList.value = res.data
}
	
const goPreview = (id)=>{
	uni.setStorageSync("storgClassList",randomList.value)
	uni.navigateTo({
		url:"/pages/preview/preview?id="+id
	})
}

//分享给好友
onShareAppMessage((e)=>{
	return {
		title:"wallpaper",
		path:"/pages/index/index"
	}
})

//分享朋友圈
onShareTimeline(()=>{
	return {
		title:"wallpapers"
	}
})

getBanner();
getDayRandom();
getNotice();
getClassify();
</script>

<style lang="scss" scoped>
.homeLayout{
	.banner{
		width: 750rpx;
		padding: 30rpx 0;
		swiper{
			width: 750rpx;
			height: 340rpx;
			&-item{
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
				.like{
					width: 100%;
					height: 100%;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				
			}
		}
		
	}
	.notice{
		width: 690rpx;
		height: 88rpx;
		line-height: 80rpx;
		background: #f9f9f9;
		margin: 0 auto;
		border-radius: 80rpx;
		display: flex;
		.left{
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			:deep(){
				.uni-icons{
					color: $brand-theme-color !important;
				}
			 } //穿透组件改变组件类名使样式改变
			.text{
				color: $brand-theme-color;
				font-weight: 600;
				font-size: 28rpx;
			}
		}
		.center{
			flex: 1;
			swiper{
				height: 100%;
				&-item{
					height: 100%;
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.right{
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	
	.select{
		padding-top: 50rpx;
		.date{
			color: $brand-theme-color;
			display: flex;
			align-items: center;
			:deep(){
				.uni-icons{
					color: $brand-theme-color !important;
				}
			 }
			.text{
				margin-left: 5rpx;
			}
		}
		.content{
			width: 720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;
			scroll-view{
				white-space: nowrap;
				.box{
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				.box:last-child{margin-right: 30rpx;}
			}
		}
	}
	
	.theme{
		padding: 50rpx 0;
		.more{
			font-size: 32rpx;
			color: #888;
		}
		.content{
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid; //网格式分布
			gap:15rpx;
			grid-template-columns: repeat(3,1fr);
		}
	}
}
</style>
