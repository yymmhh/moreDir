//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    DistrictValue:null

  },

  onLoad: function () {

  },
  //确定的回调
  SetDir(e){
    console.log(e)
    this.setData({
      DistrictValue:e.detail.ids
    })
  }
})
