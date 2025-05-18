const SYSTEM_INFO = uni.getSystemInfoSync();
export const getStatusBarHeight = ()=> SYSTEM_INFO.statusBarHeight || 15; //暴露函数使得可以导出

export const getTitleBarHeight = ()=>{
	// #ifdef APP
	let {top,height} = uni.getMenuButtonBoundingClientRect();
	return height+(top - getStatusBarHeight())*2;
	// #endif
	// #ifndef APP
	return 40;
	// #endif
}

export const getNavBarHeight = ()=>getStatusBarHeight()+getTitleBarHeight();

export const getLeftIconLeft = ()=>{
	// #ifdef MP-TOUTIAO
	let {leftIcon:{left,width}} =tt.getCustomButtonBoundingCilentRect();
	return left+perseInt(width) + 5
	// #endif
	
	// #ifndef MP-TOUTIAO
	return 0
	// #endif
}