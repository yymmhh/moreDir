
const app = getApp();

Component({

  properties: {
    DirString: { //传入的地区的数据,传入格式为比如 :北京北京市西城区新街口街道 就传入 "1,32,375,3741"
      type: String,
      value: "",
      observer: '_onRefreshDirString' //数据变动执行的方法
    },
    A_Style:{  //自定义的文字样式
      type: String,
      value: ""
    },
    isNull:{  //是否文字显示空数据(比如我组件想显示其他文字(请各位选择地区),这时候就需要传入true)
      type:Boolean,
      value:false,
      observer: '_onRefreshisNull' //数据变动执行方法

    },
    NullText:{
      type:String, //这个就是根据上面的isNull变量为true之后显示的文字内容
      value:"请选择"
    },
    sub_string_len:{ //用于字符串的截取，避免地区过长
      type:Number,
      value:0
    }
  },

  /**
   * 页面的初始数据
   */
  data: {

    showModalStatus: false,

    config_districts:app.globalData.district_config,        //地区的数据

    dirArrOne:[],               //第一列的地区数据
    dirArrTwo:[],               //第二列的地区数据
    dirArrThree:[],             //第三列的地区数据
    dirArrFour:[],              //第四列的地区数据

    dirOne:[],                  //第一列选择的数据
    dirTwo:[],                  //第二列选择的数据
    dirThree:[],                //第三列选择的数据
    dirFour:[],                 //第四列选择的数据

    dirSelectIndex:{one:0,two:0,three:0,four:0}, //地区选择的下标
    dirSelectId:"", //选择的地区数据 "1,32,375,3741"

    dirText:"请选择" //选择的地区文字数据 "北京-北京市-石景山区-古城街道",




  },

  lifetimes: {
      ready() {
        this.data.config_districts=app.globalData.district_config
        this._init(this.data.DirString)

      }
  },

  methods: {
    //刷新地区直接重新刷新
    _onRefreshDirString:function(newVal, oldVal){
      this._init(newVal)
    },
    _onRefreshisNull:function(newVal,oldVal){
        this.setData({isNull:newVal})
    },
    showDir:function(){
      this.setData({showModalStatus:!this.data.showModalStatus});
    },
    setDirText(){

      //拼接
      var text= this.data.dirArrOne[this.data.dirSelectIndex["one"]].name+"-"
                +this.data.dirArrTwo[this.data.dirSelectIndex["two"]].name+"-"
                +this.data.dirArrThree[this.data.dirSelectIndex["three"]].name+"-"
                +this.data.dirArrFour[this.data.dirSelectIndex["four"]].name


      var ids= this.data.dirArrOne[this.data.dirSelectIndex["one"]].id+"."
          +this.data.dirArrTwo[this.data.dirSelectIndex["two"]].id+"."
          +this.data.dirArrThree[this.data.dirSelectIndex["three"]].id+"."
          +this.data.dirArrFour[this.data.dirSelectIndex["four"]].id


      //地区过长,字符串截取
      if (this.data.sub_string_len!=0 && text!="" && text.length>this.data.sub_string_len){
            text=text.substring(0,this.data.sub_string_len)+"...";

      }
      this.setData({
        dirText:text,
        dirSelectId:ids
      })


      console.log(text)
    },

    save(){
      //弹框隐藏
      this.setData({showModalStatus:false});

      var ids= this.data.dirArrOne[this.data.dirSelectIndex["one"]].id+"."
          +this.data.dirArrTwo[this.data.dirSelectIndex["two"]].id+"."
          +this.data.dirArrThree[this.data.dirSelectIndex["three"]].id+"."
          +this.data.dirArrFour[this.data.dirSelectIndex["four"]].id
      var params={
        data:[this.data.dirArrOne[this.data.dirSelectIndex["one"]].id,
        +this.data.dirArrTwo[this.data.dirSelectIndex["two"]].id,
        +this.data.dirArrThree[this.data.dirSelectIndex["three"]].id,
        +this.data.dirArrFour[this.data.dirSelectIndex["four"]].id],
        text:this.data.dirText,
        ids,
      }
      console.log(params)

      //此处捕获异常会卡顿
      this.triggerEvent('callSave',params)

    },
    _init(default_dir_config){
      console.log(default_dir_config)

      //如果传入的地区为空,就去找默认的地区配置
      if (default_dir_config==""){
        default_dir_config=wx.getStorageSync("default_district")
      }
      //切割
      var default_dir_config_arr=default_dir_config.split(".")


      var default_city_id=0
      var default_city=null;
      var config_districts=this.data.config_districts

      default_city_id=default_dir_config_arr[2]  //取到区


      if (default_dir_config_arr[3]==null){
        default_dir_config_arr[3]=0;
      }
      if (default_dir_config_arr[2]==null){
        default_dir_config_arr[2]=0;
      }



      console.log(default_dir_config_arr,default_city_id)
      //转成Hashtable
      var config_districts_hash={}
      for (var index in config_districts){
        var key=config_districts[index].id
        config_districts_hash[key]=config_districts[index]
        if (key==default_city_id){
          default_city=config_districts[index]
        }

      }


      var dirSelectIndex=this.data.dirSelectIndex


      //第一梯队
      const one_temp= config_districts.filter((item) => {
        return item.parent_id == 0;
      })
      for (var index in one_temp){
        if (one_temp[index].id==default_dir_config_arr[0]){
          dirSelectIndex["one"]=index;
        }
      }

      //第二梯队
      const two_temp= config_districts.filter((item) => {
        return item.parent_id == default_dir_config_arr[0];
      })

      for (var index in two_temp){
        if (two_temp[index].id==default_dir_config_arr[1]){
          dirSelectIndex["two"]=index;
        }
      }
      var null_arr= {id: 0, parent_id: 0, name: "不限", spell: "banqiaojiedao"}

      //第三梯队
      const three_temp= config_districts.filter((item) => {
        return item.parent_id == default_dir_config_arr[1];
      })

      //第三个可能会不存在，比如儋州
      //算了不管有没有都把不限插进去
      three_temp.unshift(null_arr)



      if (three_temp.length>0){
        for (var index in three_temp){
          if (three_temp[index].id==default_dir_config_arr[2]){
            dirSelectIndex["three"]=index;
          }
        }

      }

      //第四梯队
      const four_temp= config_districts.filter((item) => {
        if (default_dir_config_arr[2]!=0){
          return item.parent_id == default_dir_config_arr[2];
        }
      })
      //插入不限
      four_temp.unshift(null_arr)
      if (four_temp.length>0){
        for (var index in four_temp){
          if (four_temp[index].id==default_dir_config_arr[3]){
            dirSelectIndex["four"]=index;
          }
        }
      }


      this.setData({
        dirArrOne:one_temp,
        dirArrTwo:two_temp,
        dirArrThree:three_temp,
        dirArrFour:four_temp,dirSelectIndex,})


      this.setDirText()

    },

    bindOneChange(e){
      var dirSelectIndex=this.data.dirSelectIndex

      dirSelectIndex={"one":e.detail.value,"two":0,"three":0,"four":0}

      this.setData({
        dirOne:this.data.dirArrOne[dirSelectIndex["one"]],
        dirSelectIndex: dirSelectIndex
      })
      this.loadTwoData()
    },

    bindTwoChange(e){
      var dirSelectIndex=this.data.dirSelectIndex
      dirSelectIndex["two"]= e.detail.value
      dirSelectIndex["three"]= 0
      dirSelectIndex["four"]=0

      this.setData({
        dirTwo:this.data.dirArrTwo[dirSelectIndex["two"]],
        dirSelectIndex: dirSelectIndex
      })

      this.loadThreeData()
    },
    bindThreeChange(e){
      var dirSelectIndex=this.data.dirSelectIndex
      dirSelectIndex["three"]= e.detail.value
      dirSelectIndex["four"]=0

      this.setData({
        dirThree:this.data.dirArrThree[dirSelectIndex["three"]],
        dirSelectIndex: dirSelectIndex
      })

      this.loadFourData()
    },


    bindFourChange(e){
      var dirSelectIndex=this.data.dirSelectIndex
      dirSelectIndex["four"]= e.detail.value


      this.setData({
        dirFour:this.data.dirArrFour[dirSelectIndex["four"]],
        dirSelectIndex: dirSelectIndex
      })

      this.setDirText()

    },

    //去加载第二列的数据
    loadTwoData(){
      var self=this
      let config_districts=this.data.config_districts
      
      const two_temp= config_districts.filter((item) => {
        return item.parent_id == this.data.dirOne.id;
      })
      this.setData({
        dirArrTwo:two_temp,
        dirTwo:two_temp[self.data.dirSelectIndex["two"]],
      })

      this.loadThreeData()
    },

    //去加载第三级
    loadThreeData(){
      var self=this
      let config_districts=this.data.config_districts
      const three_temp= config_districts.filter((item) => {
        return item.parent_id == self.data.dirTwo.id;
      })

        var null_arr= {id: 0, parent_id: 0, name: "不限", spell: "banqiaojiedao"}
        //插入个不限进去
        three_temp.unshift(null_arr)

      this.setData({
        dirArrThree:three_temp,
        dirThree:three_temp[self.data.dirSelectIndex["three"]],
      })

      this.loadFourData()
    },

    //去加载第四级
    loadFourData(){
      var self=this
      let config_districts=this.data.config_districts

      var four_temp= config_districts.filter((item) => {
        if (self.data.dirThree!=null){
          return item.parent_id == self.data.dirThree.id;
        }
      })

      var null_arr= {id: 0, parent_id: 0, name: "不限", spell: "banqiaojiedao"}
      //插入个不限进去
      four_temp.unshift(null_arr)

      this.setData({
        dirArrFour:four_temp,
        dirFour:four_temp[self.data.dirSelectIndex["four"]],
      })
      this.setDirText()
    },
    powerDrawer: function (e) {
      var currentStatu = e.currentTarget.dataset.statu;
      this.util(currentStatu)
    },
    util: function(currentStatu){
      /* 动画部分 */
      // 第1步：创建动画实例
      var animation = wx.createAnimation({
        duration: 200,  //动画时长
        timingFunction: "linear", //线性
        delay: 0  //0则不延迟
      });

      // 第2步：这个动画实例赋给当前的动画实例
      this.animation = animation;

      // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
      animation.translateY(240).step();

      // 第4步：导出动画对象赋给数据对象储存
      this.setData({
        animationData: animation.export()
      })

      // 第5步：设置定时器到指定时候后，执行第二组动画
      setTimeout(function () {
        // 执行第二组动画：Y轴不偏移，停
        animation.translateY(0).step()
        // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
        this.setData({
          animationData: animation
        })

        //关闭抽屉
        if (currentStatu == "close") {
          this.setData(
              {
                showModalStatus: false
              }
          );
        }
      }.bind(this), 200)

      // 显示抽屉
      if (currentStatu == "open") {
        this.setData(
            {
              showModalStatus: true
            }
        );
      }
    },
  },

})