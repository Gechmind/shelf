const api = require('../../config.js');

Page({
  data:{
    src:"http://192.168.199.192:8080/image/9787115433145"
  },
  scancode(){
    var that = this
    console.log("call scan code");
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ["barCode"],
      success: (res) => {
        let url = api.isbn + res.result;
        console.log(res);
        console.log(url)
        if(res.result){
        	wx.request({
            url: url,
            method:'GET',
        		success:function(resp){
              that.setData({
                src: api.image + resp.data.isbn
              })
        		}
        	})
        }
      }
    })
    }
})