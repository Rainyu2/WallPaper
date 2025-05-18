export function formatTimeAgo(timestamp) {
    const current = Date.now();
    const diff = current - Number(timestamp);
    const absDiff = Math.abs(diff);
    
    if (absDiff < 60 * 1000) {
        return '1分钟';
    } else if (absDiff < 60 * 60 * 1000) {
        const minutes = Math.floor(absDiff / (60 * 1000));
        return `${minutes}分钟`;
    } else if (absDiff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(absDiff / (60 * 60 * 1000));
        return `${hours}小时`;
    } else if (absDiff < 30 * 24 * 60 * 60 * 1000) {
        const days = Math.floor(absDiff / (24 * 60 * 60 * 1000));
        return `${days}天`;
    } else if (absDiff < 90 * 24 * 60 * 60 * 1000) {
        const months = Math.floor(absDiff / (30 * 24 * 60 * 60 * 1000));
        return `${months}个月`;
    } else {
        return null;
    }
}


export function gotoHome(){
	uni.showModal({
		title:"提示",
		content:"页面有误将返回首页",
		showCancel:false,
		success: (res) => {
			if(res.confirm){
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		}
	})
}