//获取应用实例
const app = getApp()
Page({
  data: {
    taskList:[],
    userInfo: {},
    is_hidden:'',
    hasUserInfo: app.globalData.hasUserInfo,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  getUserInfo: function (e) {
    var _this = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            var rawData = res.rawData;
            var signature = res.signature;
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            var data = {
              "code": code,
              "rawData": rawData,
              "signature": signature,
              'iv': iv,
              'encryptedData': encryptedData
            };
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            app.http.postHttp(app.http.url.getOpenId, data).then(function (res) {
              //取得openid
              wx.setStorage({
                key: "openid",
                data: res.openId
              })
              var data = { openid: res.openId };
              var header = { 'content-type': 'application/json' }
              app.http.postHttp(app.http.url.getList, data, header).then(function (res) {
                _this.setData({
                  taskList: res.data
                })
              })
            });
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
      }
    })
    wx.setStorage({
      key: "userinfo",
      data: e.detail.userInfo
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo:true
    })
  },
  onShow: function (e) {
    var _this = this;
    if (app.globalData.hasUserInfo){
      var user = app.globalData.userInfo
      _this.setData({
        userInfo: user
      })
      var data = { openid: app.globalData.openId };
      var header = { 'content-type': 'application/json' }
      app.http.postHttp(app.http.url.getList, data, header).then(function (res) {
        _this.setData({
          taskList: res.data,
          is_hidden: 'hidden'
        })
      })
    }else{
      _this.setData({
        is_hidden: 'hidden'
      })
    }
  },
  onPullDownRefresh: function (e) {
    wx.showNavigationBarLoading();
    var _this = this;
    if (app.globalData.hasUserInfo) {
      var data = { openid: app.globalData.openId };
      var header = { 'content-type': 'application/json' }
      app.http.postHttp(app.http.url.getList, data, header).then(function (res) {
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        _this.setData({
          taskList: res.data
        })
      })
    }
  }
})