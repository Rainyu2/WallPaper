<template>
	<view class="userLayout pageBg" v-if="userInfo">
		<view :style="{height:getNavBarHeight()+'px'}"></view>
		<view class="userInfo">
			<view class="avatar">
				<image src="/static/images/xxmLogo.png" mode="scaleToFill"></image>
			</view>
			<view class="ip">{{userInfo.IP}}</view>
			<view class="address">来自于：
			{{userInfo.address.city|| userInfo.address.province ||userInfo.address.country}}</view>
		</view>
		
		
		<view class="section">
			<view class="list">
				<view class="row" @click="gotoList">
					<view class="left">
						<uni-icons type="download-filled" size="20"></uni-icons>
						<view class="text">我的下载</view>
					</view>
					<view class="right">
						<view class="text">{{userInfo.downloadSize}}</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				<view class="row" @click="gotoListScore">
					<view class="left">
						<uni-icons type="star-filled" size="20"></uni-icons>
						<view class="text">我的评分</view>
					</view>
					<view class="right">
						<view class="text">{{userInfo.scoreSize}}</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				<view class="row">
					<view class="left">
						<uni-icons type="chatboxes-filled" size="20"></uni-icons>
						<view class="text">联系客服</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
					<!-- #ifdef MP -->
					<button open-type="contact">联系客服</button>
					<!-- #endif -->
					<!-- #ifndef MP -->
					<button @click="clickContact">拨打电话</button>
					<!-- #endif --> <!-- 多终端匹配 -->
				</view>
			</view>
		</view>
		
		<view class="section">
			<view class="list">
				<navigator url="/pages/notices/detail?id=653507c6466d417a3718e94b&name=订阅更新" class="row">
					<view class="left">
						<uni-icons type="notification-filled" size="20"></uni-icons>
						<view class="text">订阅更新</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</navigator>
				<navigator url="/pages/notices/detail?id=6536358ce0ec19c8d67fbe82&name=常见问题" class="row">
					<view class="left">
						<uni-icons type="flag-filled" size="20"></uni-icons>
						<view class="text">常见问题</view>
					</view>
					<view class="right">
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</navigator>
			</view>
		</view>
	</view>
	
	<view class="loadingLayout" v-else>
		<view :style="{height:getNavBarHeight()+'px'}"></view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<script setup>
import {getNavBarHeight} from "@/utils/system.js"
import {apiUserInfo} from "@/api/api.js"
import { ref } from "vue"

const userInfo = ref(null)
	
const clickContact=()=>{
	uni.makePhoneCall({
		phoneNumber:"19557581531"
	})
}

function gotoList(){
	uni.navigateTo({
		url:"/pages/classlist/classlist?name=我的下载&type=download"
	})
}

function gotoListScore(){
	uni.navigateTo({
		url:"/pages/classlist/classlist?name=我的评分&type=score"
	})
}

const getUserInfo = ()=>{
	apiUserInfo().then(res=>{
		console.log(res);
		userInfo.value = res.data
	})
}

getUserInfo();
</script>

<style lang="scss" scoped>
.userLayout{
	.userInfo{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 50rpx 0;
		.avatar{
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.ip{
			font-size: 44rpx;
			color: #333;
			padding: 20rpx 0 5rpx;
		}
		.address{
			font-size: 28rpx;
			color: #aaa;
		}
	}
	
	.section{
		width: 690rpx;
		margin: 50rpx auto;
		border: 1rpx solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);
		.list{
			.row{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 30rpx;
				height: 100rpx;
				border-bottom: 1px solid #eee;
				position: relative;
				background: #fff;
				&:last-child{border-bottom: 0}
				.left{
					display: flex;
					align-items: center;
					:deep(){
						.uni-icons{
							color: $brand-theme-color !important;
						}
					 }
					.text{
						padding-left: 20rpx;
						color: #666;
					}
				}
				.right{
					display: flex;
					align-items: center;
					.text{
						font-size: 28rpx;
						color: #aaa;
					}
				}
				button{
					position: absolute;
					top: 0;
					left: 0;
					height: 100rpx;
					width: 100%;
					opacity: 0;//透明度
				}
			}
		}
	}
}
</style>
