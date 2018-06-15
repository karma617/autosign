// 请求地址
var host = 'https://autosign.qdapi.com';
//get
function getHttp(url, data, header = { 'content-type': 'application/x-www-form-urlencoded'}){
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      header: header,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode != 200) {
          reject({ error: '服务器忙，请稍后重试', code: 500 });
          return;
        }
        resolve(res.data);
      },
      fail: function (res) { reject({ error: '网络错误', code: 0 }) },
      complete: function (res) { },
    })
  })
}
//post
function postHttp(url, data, header = { 'content-type': 'application/x-www-form-urlencoded'}){
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      header: header,
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode != 200) {
          reject({ error: '服务器忙，请稍后重试', code: 500 });
          return;
        }
        resolve(res.data);
      },
      fail: function (res) { reject({ error: '网络错误', code: 0  })},
      complete: function (res) {},
    })
  })
}
module.exports={
  getHttp: function (url, data, header) {
    return getHttp(url, data, header);
  },
  postHttp: function (url, data, header){
    return postHttp(url,data,header);
  },
  url: {
    getOpenId: host + '/user/wxinfo/getOpenId', //获取用户openid
    addCronTask: host + '/cronjob/task/addCronTask', //添加定时任务
    httptest: host + '/httptest/httptest/index', //http请求测试
    getList: host + '/user/getlist/getList',//获取用户任务列表
    eidtCronTask: host + '/cronjob/task/eidtCronTask', //修改定时任务
    getCronTask: host + '/cronjob/task/getCronTask', //获取定时任务
    feedback: host + '/user/feedback/feedback',//
  }
}