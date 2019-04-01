// View/Test.js

//时间部分
const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
//获取年
for (let i = 2018; i <= date.getFullYear() + 5; i++) {
  years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}
//时间部分

const app = getApp()



Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    //奖项数组
    lists: [{
      name:null,            //奖品名字
      level: null,           //奖项等级
      number: null,            //奖项数量
      image:null            //图片
    }
    ],
    time: '',
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [0, 9, 16, 10, 17],
    choose_year: '',
    roomName:null,          //房间名字
    name: null,            
    level: null,
    number: null,
    describe: null,         //描述
    switch1: false,          //是否允许公共抽奖
    image:null,

  },

  imgs: [{}],

//奖项数组
  lists: [{
    name: null,            //奖品名字
    level: null,           //奖项等级
    number: null,            //奖项数量
    image: null            //图片
  }
  ],




//公共开关改变
  onChange(event) {
    const detail = event.detail;
    this.setData({
      'switch1': detail.value
    })

  },

//点击选择房间图片
chooseImg:function()
{
  var that=this;
  wx.chooseImage({
    count:3,
    sizeType:['original','compressed'],   //指定是原图还是压缩图，默认都有
    sourceType:['album','camera'],         //指定相册还是相机，默认都有
    success: function(res) {
    //返回选定照片本地文件路径
    var tempFilePaths = res.tempFilePaths;
    that.setData({
      imgs:tempFilePaths
    });
     //base64编码处理图片
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
            //console.log('data:image/png;base64:' + res.data)
              that.imgs[0] = res.data
            }
          })
    },
  })
},

//预览房间图片 给 image加事件，利用e.target.dataset.src 获取当前图片地址，赋值给wx.previewImage的current变量。
previewImg:function(e){
var current = e.target.dataset.src;
wx.previewImage({
  urls: this.data.imgs,
  current:current,
  success:function(e){
    console.log('预览成功')
  }
})
},


//房间名字输入
  roomNameInput:function(e)
  {
    this.setData({ roomName: e.detail.value });
  },

//奖品名字输入
  NameInput: function (e) {
    this.lists[e.currentTarget.dataset.info].name = e.detail.value;
  },

//奖品等级输入
  levelInput: function (e) {
    this.lists[e.currentTarget.dataset.info].level = e.detail.value;
  },

  //奖品个数输入
  numberInput: function (e) {
    this.lists[e.currentTarget.dataset.info].number = e.detail.value;
  },


  //奖品图片输入
  imageInput: function (e) {
    
    this.lists[e.currentTarget.dataset.info].image = e.detail.value;
  },


//奖品描述输入
  describeInput: function (e) {
    this.setData({ describe: e.detail.value });
  },


//奖项添加
  awardadd() {
    var that = this;
    var obj = {};
    obj.name = "";
    obj.level = "";
    obj.number = "";
    //let lists = that.data.lists;
    this.lists.push(obj);
    that.setData({ lists: this.lists });
  },



//打印所有讯息
  loginBtnClick: function (e) {
    console.log("用户名：" + this.data.roomName  );
    this.setData({
      lists: this.lists
    });
    var that=this;
    let lists = that.data.lists;
    console.log( that.data.lists);
    console.log("描述：" + this.data.describe);
  }
  ,

//数据服务器交互
requestphp()
{
  var that = this //创建一个名为that的变量来保存this当前的值  
  wx.request({
    url: 'http://39.107.64.93/requests',
    method: 'post',
    data: {

      imgs: JSON.stringify(this.imgs),
       name:this.data.roomName,
       time:this.data.time,
      lists: JSON.stringify(this.data.lists),
      describe:this.data.describe,
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'  //这里注意POST请求content-type是小写，大写会报错  
    },
    success: function (res) {
      that.setData({ //这里是修改data的值  
        test: res.data //test等于服务器返回来的数据  
      });
      console.log(res.data)
    }
  });  
},

  requestimg:function()
  {
    var that = this //创建一个名为that的变量来保存this当前的值  
    wx.request({
      url: 'http://39.107.64.93/requests',
      method: 'post',
      data: {
        imgs: JSON.stringify(this.imgs),
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'  //这里注意POST请求content-type是小写，大写会报错  
      },
      success: function (res) {
        that.setData({ //这里是修改data的值  
          test: res.data //test等于服务器返回来的数据  
        });
        console.log(res.data)
      }
    });  
    
  },







 //加入数组
  addList: function () {
    var lists = this.data.lists;
    var newData = {};
    lists.push(newData);//实质是添加lists数组内容，使for循环多一次
    this.setData({
      lists: lists,
    })
  },

  //删除数组
  delList: function () {
    // var lists = this.data.lists;
    this.lists.pop();      //实质是删除lists数组内容，使for循环少一次
    this.setData({
      lists: this.lists,
    })
  },



  //获取时间日期
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    // console.log(`${year}-${month}-${day}-${hour}-${minute}`);
    this.setData({
      time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    })
    // console.log(this.data.time);
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      console.log(choose_year);
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        console.log(year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },














  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //设置默认的年份
    this.setData({
      choose_year: this.data.multiArray[0][0]
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  jumpPage:function()
  {
    wx.navigateTo({
      url: '/tianmao/pages/index/index',
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})