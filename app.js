//app.js
var curl = require('./common/js/curl.js');
var common = require('./common/js/common.js');
App({
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
        }
      }
    })
    this.globalData.userInfo = wx.getStorageSync('userinfo');
    var userinfo = wx.getStorageSync('userinfo');
    if (userinfo){
      this.globalData.userInfo = userinfo;
      this.globalData.hasUserInfo = true;
    }
  },
  globalData: {
    userInfo: null,
    hasUserInfo:false,
    openId: wx.getStorageSync('openid'),
    url:'',
    data:'',
    header:'',
    cookies:'',
    isHttp:false
  },
  http:curl,
  common:common
})