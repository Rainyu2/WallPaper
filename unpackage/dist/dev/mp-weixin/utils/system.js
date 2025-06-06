"use strict";
const common_vendor = require("../common/vendor.js");
const SYSTEM_INFO = common_vendor.index.getSystemInfoSync();
const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15;
const getTitleBarHeight = () => {
  return 40;
};
const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight();
const getLeftIconLeft = () => {
  return 0;
};
exports.getLeftIconLeft = getLeftIconLeft;
exports.getNavBarHeight = getNavBarHeight;
exports.getStatusBarHeight = getStatusBarHeight;
exports.getTitleBarHeight = getTitleBarHeight;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/system.js.map
