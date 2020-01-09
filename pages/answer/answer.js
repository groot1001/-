// pages/answer/answer.js
const util = require('../../utils/util.js'),
  api = require("../../api/answerApi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [], //答疑数据
    param: {
      pageNo: 1,
      pageSize: 20,
      keyword: ''
    },
    hr: {
      'content-type': 'application/json'
    },
    keywords: '',
    // 拖拽参数
    writePosition: [80, 60], //默认定位参数
    writesize: [0, 0],// X Y 定位
    window: [0, 0], //屏幕尺寸
    write: [0, 0], //定位参数
    scrolltop: 0,//据顶部距离
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getList();
    let that = this;
    that.getSysdata();
  },
  //计算默认定位值
  getSysdata: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (e) {
        that.data.window = [e.windowWidth, e.windowHeight];
        var write = [];
        write[0] = that.data.window[0] * that.data.writePosition[0] / 100;
        write[1] = that.data.window[1] * that.data.writePosition[1] / 100;
        console.log(write, 45)
        that.setData({
          write: write
        }, function () {
          // 获取元素宽高
          wx.createSelectorQuery().select('.collectBox').boundingClientRect(function (res) {
            console.log(res.width)
            that.data.writesize = [res.width, res.height];
          }).exec();
        })
      },
      fail: function (e) {
        console.log(e)
      }
    });
  },
  //开始拖拽  
  touchmove: function (e) {
    var that = this;
    var position = [e.touches[0].pageX - that.data.writesize[0] / 2, e.touches[0].pageY - that.data.writesize[1] / 2 - this.data.scrolltop];
    that.setData({
      write: position
    });
  },
  onPageScroll(e) {
    this.data.scrolltop = e.scrollTop;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let param=this.data.param;
    param.keyword = '';
    this.setData({
      param,
      keywords:''
    })
    this.getList();
  },
  // 实时input值
  // bindKeyInput: function(e) {
  //   this.setData({
  //     keywords: e.detail.value
  //   })
  //   console.log(this.data.keywords.length);
  //   // let that = this;
  //   // if (that.data.keywords.length == 0) {
  //   //   that.data.param.keywords == '';
  //   //   that.getList();
  //   // }
  // },
  blurdata(e) {
    console.log(e.detail.value);
    this.setData({
      keywords: e.detail.value
    })
    let that = this;
    if (that.data.keywords.length == 0) {
      // this.setData({
      //   param: {
      //     pageNo: 1,
      //     pageSize: 20,
      //     keyword: ''
      //   },
      //   keywords:''
      // })
      that.data.keywords = '';
      this.data.param.keyword='';
      // console.log(that.data.keywords);
      that.getList();
    }else{
      // this.setData({
      //   param: {
      //     pageNo: 1,
      //     pageSize: 20,
      //     keyword: e.detail.value
      //   },
      //   keywords: e.detail.value
      // })
      // console.log(that.data.keywords);
      that.data.keywords = e.detail.value;
      this.data.param.keyword = e.detail.value;
      that.getList();
    }
  },
  // 搜索
  search() {
    // console.log('search:', this.data.keywords);
    // console.log(this.data.param.keyword);
    // if (this.data.keywords == '') {
    //   wx.showToast({
    //     title: '请输入关键字',
    //     icon: 'none',
    //     duration: 1000
    //   })
      // this.data.param.keyword = '';
      // this.getList();
    // } 
    // else if (this.data.keywords != ''){
    //   this.data.dataList = [];
    //   this.data.param.keyword = this.data.keywords;
    //   console.log(this.data.param.keyword);
    //   this.getList();
    // }
  },
  // 提问
  askbtn: function() {
    if (wx.getStorageSync("token_key")) {
      wx.navigateTo({
        url: '../sendarea/sendarea',
      })
    } else {
      wx.navigateTo({
        url: '/pages/author_login/author_login',
      })
    }
  },
  // 答疑详情跳转
  todatail(e) {
    // console.log(e.currentTarget.dataset.id);
    if (wx.getStorageSync("token_key")) {
      wx.navigateTo({
        url: '/pages/answer-det/answer-det?id=' + e.currentTarget.dataset.id
      })
    } else {
      wx.navigateTo({
        url: '/pages/author_login/author_login',
      })
    }
  },
  // 请求答疑板块数据
  getList() {
    wx.showLoading({
      title: '加载中',
    });
    let param = this.data.param,
      that = this;
    that.data.param.pageNo = 1;
    // console.log('meici', param);
    util.wxReq(api().interation_list.url, param, "get", api().interation_list.hr).then(res => {
      if (res.statusCode === 200) {
        wx.hideLoading();
        let dataList = res.data.data;
        // console.log(res.data.data);

        that.setData({
          dataList: dataList,
          
        })
        // console.log(res.data.data);
      } else {

      }
    })
  },
  // 下一页数据
  nextList() {
    wx.showLoading({
      title: '加载中',
    });
    let param = this.data.param,
      that = this;
    util.wxReq(api().interation_list.url, param, "get", api().interation_list.hr).then(res => {
      if (res.statusCode === 200) {
        wx.hideLoading();
        let dataList = that.data.dataList.concat(res.data.data),
          ismorelist = res.data.data;
        if (ismorelist.length == 0) {
          wx.showToast({
            title: '没有更多数据了',
            icon: 'success',
            duration: 2000
          })
        }
        that.setData({
          dataList: dataList
        })
      } else {

      }
    })
  },
  // 分页函数
  nextPage() {
    this.data.param.pageNo++;
    this.nextList();
  },
  // newpage(){
  //    this.getList();
  // },
  // 查看所有数据
  // searchAll() {
  //   this.data.param.keyword = '';
  //   this.getList();
  // },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})