function myAlert(str=''){
  wx.showModal({
    content: str,
    showCancel: false,
    success:function(res){
      
    }
  });
}
function toast(str = '', time = 2000,fuc = function(){}, status = 'success', images = ''){
  wx.showToast({
    title: str,
    icon: status,
    image:'',
    duration: time,
    success:function(){
      fuc;
    }
  });
}
module.exports={
  myAlert:myAlert,
  toast:toast
}