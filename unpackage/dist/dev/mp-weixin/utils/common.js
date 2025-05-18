"use strict";
require("../common/vendor.js");
function formatTimeAgo(timestamp) {
  const current = Date.now();
  const diff = current - Number(timestamp);
  const absDiff = Math.abs(diff);
  if (absDiff < 60 * 1e3) {
    return "1分钟";
  } else if (absDiff < 60 * 60 * 1e3) {
    const minutes = Math.floor(absDiff / (60 * 1e3));
    return `${minutes}分钟`;
  } else if (absDiff < 24 * 60 * 60 * 1e3) {
    const hours = Math.floor(absDiff / (60 * 60 * 1e3));
    return `${hours}小时`;
  } else if (absDiff < 30 * 24 * 60 * 60 * 1e3) {
    const days = Math.floor(absDiff / (24 * 60 * 60 * 1e3));
    return `${days}天`;
  } else if (absDiff < 90 * 24 * 60 * 60 * 1e3) {
    const months = Math.floor(absDiff / (30 * 24 * 60 * 60 * 1e3));
    return `${months}个月`;
  } else {
    return null;
  }
}
exports.formatTimeAgo = formatTimeAgo;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/common.js.map
