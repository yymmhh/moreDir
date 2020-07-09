//app.js
App({
  onLaunch: function () {
    this.getDistrictConfig()
  },
  getDistrictConfig(){
    let that = this;


      wx.request({
        url: "http://cxt.cdn.wlphp.cn/category_districts.json",
        data: [],
        success: function(res) {
          console.log(res)
          that.globalData.district_config=res.data
        }
      });



  },
  globalData: {
    userInfo: null,
    district_config:null
  }
})