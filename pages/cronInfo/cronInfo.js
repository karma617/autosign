//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    types: ["POST", "GET", "PUT"],
    openid: null,
    tid:null,
    typeIndex: 0,
    title: '',
    url: '',
    data: '',
    header: '',
    cookies: '',
    buttonText: '提交修改',
    disabled: false
  },
  onLoad: function (options) {
    this.setData({
      tid: options.id
    })
  },
  bindtypeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  formSubmit: function (e) {
    var _this = this;
    _this.setData({
      disabled: true,
      buttonText: '正在提交'
    })
    if (!app.globalData.hasUserInfo) {
      wx.showModal({
        content: "请先登录",
        showCancel: false,
        success: function (res) {
          wx.switchTab({
            url: '../login/login',
            fail: function () {
              console.info("跳转失败")
            }
          })
        }
      });
    }
    if (e.detail.value.url == 0) {
      app.common.myAlert("请填写请求地址");
      _this.setData({
        disabled: false,
        buttonText: '提交修改'
      })
    } else {
      var data = { param: e.detail.value, wxuser: app.globalData.userInfo, tid: this.data.tid};
      var header = { 'content-type': 'application/json' }
      if (e.detail.value.openid) {
        app.http.postHttp(app.http.url.eidtCronTask, data, header).then(function (res) {
          console.log(res);
          if (res.statusCode == 200) {
            _this.setData({
              title: '',
              url: "",
              data: "",
              header: "",
              cookies: ""
            })
            wx.showModal({
              content: "任务修改成功",
              showCancel: false,
              success: function (res) {
                wx.switchTab({
                  url: '../login/login',
                  fail: function () {
                    console.info("跳转失败")
                  }
                })
              }
            });
          } else {
            app.common.toast("任务修改失败", 2000);
            _this.setData({
              disabled: false,
              buttonText: '提交修改'
            })
          }
        });
      } else {
        _this.setData({
          disabled: false,
          buttonText: '提交修改'
        })
      }
      _this.setData({
        disabled: false,
        buttonText: '提交修改'
      })
    }

  },
  touchstart: function () {
    this.setData({
      openid: wx.getStorageSync('openid'),
    })
  },
  onShow: function (e) {
    var _this = this;
    var is_openid = wx.getStorageSync('openid');
    if (is_openid) {
      this.setData({
        openid: is_openid
      })
      var data = { openid: is_openid ,tid:this.data.tid};
      var header = { 'content-type': 'application/json' }
      //获取定时任务
      app.http.getHttp(app.http.url.eidtCronTask, data, header).then(function (res) {
        if (res.statusCode == 200) {
          _this.setData({
            title: res.data.title,
            url: res.data.url,
            data: res.data.data,
            header: res.data.header,
            cookies: res.data.cookies
          })
        } else {
          app.common.myAlert("任务创建失败");
          _this.setData({
            disabled: false,
            buttonText: '提交任务'
          })
        }
      });


    }
  }
})
