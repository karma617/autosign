//获取应用实例
const app = getApp()
Page({
  data: {
    types: ["POST", "GET","PUT"],
    openid:null,
    typeIndex: 0,
    dsiabled:false,
    buttonText:'提交',
    url:"",
    data:"",
    header:"",
    cookies:""
  },
  onLoad: function () {
  },
  bindtypeChange:function(e){
    this.setData({
      typeIndex: e.detail.value
    })
  },
  resetInfo:function(e){
    this.setData({
      url:"",
      data:"",
      header:"",
      cookies:""
    })
  },
  formSubmit:function(e){
    var _this = this;
    _this.setData({
      disabled:true,
      buttonText:'正在提交'
    })
    if (!app.globalData.userInfo){
      wx.switchTab({
        url: '/pages/login/login',
        fail: function () {
          console.info("跳转失败")
        }
      })
      _this.setData({
        disabled: false,
        buttonText: '提交'
      })
    }else if (e.detail.value.url == 0){
      app.common.myAlert("请填写请求地址");
      _this.setData({
        disabled: false,
        buttonText: '提交'
      })
    }else{
      var data = { param: e.detail.value};
      var header = { 'content-type': 'application/json' };
      app.http.postHttp(app.http.url.httptest, data,header).then(function(res){
        wx.showModal({
          content: res+" 是否填写到签到任务表单？",
          showCancel: true,
          success: function (res) {
            if(res.confirm){
              app.globalData.isHttp = true;
              app.globalData.url = e.detail.value.url;
              app.globalData.data = e.detail.value.data;
              app.globalData.header = e.detail.value.header;
              app.globalData.cookies = e.detail.value.cookies;
              wx.switchTab({
                url: '../task/task',
                fail: function () {
                  console.info("跳转失败")
                }
              })
            }
          }
        });
        _this.setData({
          disabled: false,
          buttonText: '提交'
        })
      });
    }
    
  },
  touchstart:function(){
    
  },
  onShow:function(){

  }
})
