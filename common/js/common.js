function myAlert(str=''){
  wx.showModal({
    content: str,
    showCancel: false,
    success:function(res){
      
    }
  });
}
function toast(str = '', images = '',_this=null, time = 2000, status = 'success'){
  wx.showToast({
    title: str,
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