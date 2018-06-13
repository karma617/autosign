//获取应用实例
const app = getApp()
Page({
  data: {
    types: ["POST", "GET","PUT"],
    openid:null,
    typeIndex: 0,
    title:'',
    url: '',
    data: '',
    header: '',
    cookies: '',
    buttonText:'提交任务',
    disabled:false
  },
  onLoad: function () {
    
  },
  bindtypeChange:function(e){
    this.setData({
      typeIndex: e.detail.value
    })
  },
  formSubmit:function(e){
    var _this=this;
    _this.setData({
      disabled: true,
      buttonText: '正在提交'
    })
    if (!app.globalData.hasUserInfo){
      
    }
    if (e.detail.value.url == 0){
      app.common.myAlert("请填写请求地址");
      _this.setData({
        disabled: false,
        buttonText: '提交任务'
      })
    }else{
      var data = { param: e.detail.value, wxuser: app.globalData.userInfo};
      var header = { 'content-type': 'application/json' }
      if (e.detail.value.openid){
        app.http.postHttp(app.http.url.addCronTask, data, header).then(function (res) {
          console.log(res);
          if (res.statusCode == 200) {
            app.common.myAlert("任务创建成功");
            _this.setData({
              title: '',
              url: "",
              data: "",
              header: "",
              cookies: ""
            })
          } else {
            app.common.myAlert("任务创建失败");
            _this.setData({
              disabled: false,
              buttonText: '提交任务'
            })
          }
        });
      }else{
        _this.setData({
          disabled: false,
          buttonText: '提交任务'
        })
      }
      _this.setData({
        disabled: false,
        buttonText: '提交任务'
      })
    }
    
  },
  touchstart:function(){
    this.setData({
      openid: wx.getStorageSync('openid'),
    })
  },
  resetInfo: function (e) {
    this.setData({
      title:'',
      url: "",
      data: "",
      header: "",
      cookies: ""
    })
  },
  onShow:function(){
    var is_openid = wx.getStorageSync('openid');
    if (is_openid){
      this.setData({
        openid: is_openid
      })
    }else{
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
    //填写表单
    if (app.globalData.isHttp) {
      this.setData({
        url: app.globalData.url,
        data: app.globalData.data,
        header: app.globalData.header,
        cookies: app.globalData.cookies
      })
    }
  }
})
