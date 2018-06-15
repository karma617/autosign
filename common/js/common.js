function myAlert(str=''){
  wx.showModal({
    content: str,
    showCancel: false,
    success:function(res){
      
    }
  });
}
function toast(str = '', images = '', time = 2000, status = 'success'){
  wx.showToast({
    title: "\r\n"+str,
    icon: status,
    image: images,
    duration: time,
    success:function(){
    }
  });
}
module.exports={
  myAlert:myAlert,
  toast:toast
}