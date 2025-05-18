import { request } from "../utils/request"

//头部栏
export function apiGetBanner(){
	return request({
		url:"/homeBanner"
	});
} 

//每日推荐随机预览
export function apigetDayRandom(){
	return request({url:"/randomWall"});
}

//公告栏
export function apigetNotice(data={}){
	return request({
		url:"/wallNewsList",
		data
	});
}

//分类页面大体
export function apigetClassify(data={}){
	return request({
		url:"/classify",
		data
	})
}

//分类页面详细
export function apiGetClassList(data={}){
	return request({
		url:"/wallList",
		data
	})
}

//获取评分
export function apiGetSetupScore(data={}){
	return request({
		url:"/setupScore",
		data
	})
}

//壁纸下载
export function apiWriteDownload(data={}){
	return request({
		url:"/downloadWall",
		data
	})
}

//各个壁纸信息
export function apiDetailWall(data={}){
	return request({
		url:"/detailWall",
		data
	})
}

//获取个人信息
export function apiUserInfo(data={}){
	return request({
		url:"/userInfo",
		data
	})
}

//获取我的评分和下载列表
export function apiGetHistoryList(data={}){
	return request({
		url:"/userWallList",
		data
	})
}

//获取公告详情
export function apiNoticeDetail(data={}){
	return request({
		url:"/wallNewsDetail",
		data
	})
}

//搜索壁纸
export function apiSearchData(data={}){
	return request({
		url:"/searchWall",
		data
	})
}