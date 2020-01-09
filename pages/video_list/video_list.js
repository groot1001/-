// pages/textualResearchList/textualResearchList.js
const util = require('../../utils/util.js'),
  cf = require("../../api/apiConfig.js"),
  api = require("../../api/videoCourseApi.js");
  var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //下拉框控制
    screen_box: 'none',
    flag: true,
    blockes: 'css1',
    screen_box2: 'none',
    flag2: true,
    blockes2: 'css1',
    top_screen_name: '课程分类',
    param: { //请求列表视频参数
      videoType: 1, //考证类视频
      customCatsId: 0, //分类
      screenWhere: 1, //是否热门最新
      pageNo: 1,
      pageSize: 10
    },
    goBottom: true,
    couseCategoryData: [], //刷选的分类
    cindex: 1,
    couseCategoryMinId: 0, //标记选择状态
    imgurl_www: cf._www, //链接拼接
    this_id: 0,
    this_id_min: 0,
    max_caregory_idnex: 0,
    min_caregory_idnex: 0,
    chlid_cate: [],
    video_chlids: [],
    platform:''
  },



  //课程分类筛选框
  screen_dis: function(e) {
    if (this.data.flag) {
      this.setData({
        flag2: true,
        screen_box2: 'none',
        flag: false,
        blockes: 'css1',
        screen_box: 'block',
      })
    } else {
      this.setData({
        flag2: true,
        screen_box2: 'none',
        flag: true,
        blockes: 'css2',
        screen_box: 'block',
      })
    }

  },
  //课程排序筛选框
  screen_dis2: function(e) {

    if (this.data.flag2) {

      this.setData({

        flag: true,
        screen_box: 'none',
        flag2: false,
        blockes2: 'css1',
        screen_box2: 'block',
      })
    } else {
      this.setData({
        flag: true,
        screen_box: 'none',
        flag2: true,
        blockes2: 'css2',
        screen_box2: 'block',
      })
    }

  },
  //点击大类
  click_maxClass: function(e) {
    let ind = e.currentTarget.dataset.ind;
    this.setData({
      cindex: ind
    })
  },
  // 点击分类请求
  selectedCouse: function(e) {

    let param = this.data.param,
      cid = e.currentTarget.dataset.cid;
    param.customCatsId = cid;
    param.pageNo = 1;
    this.setData({
      top_screen_name: e.currentTarget.dataset.cname,
      couseCategoryMinId: cid,
      param: param, //重设参数
      flag: true,
      blockes: 'css2',
      screen_box: 'block',
      video_chlids: [] //清楚原始数据
    })
    this.getCouseList();
  },

  //点击排序
  sortOrder: function(e) {
    let param = this.data.param,
        screenWhere = e.currentTarget.dataset.sw;
    param.screenWhere = screenWhere;
    param.pageNo = 1;
    this.setData({
      param: param,
      flag2: true,
      blockes2: 'css2',
      screen_box2: 'block',
      video_chlids: [] //清楚原始数据
    }),this.getCouseList();
  },
  // 请求视频课程列表
  getCouseList: function() {
    console.log(api())
    wx.showLoading({
      title: '加载中~',
    })
    let self = this;
    util.wxReq(api().textualResearchList.url, self.data.param, 'get', api().textualResearchList.hr).then(res => {
      wx.hideLoading();
      console.log(res.data)
      if (res.data.data.length != 0 && res.data.data) {
      
        self.setData({
          video_chlids: self.data.video_chlids.concat(res.data.data)
        })

      } else {
        self.setData({
          goBottom: false
        })
        wx.showToast({
          title: '暂无数据~',
          icon: 'none',
          duration: 2000
        })
      }


    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let platform = wx.getSystemInfoSync().platform;
    this.setData({ platform })

    let params = this.data.param;
    params.videoType = options.videoType;
    wx.setNavigationBarTitle({
      title: options.videoType == 2 ? '财税实操' : options.videoType == 1 ? '职称考证' : options.videoType == 5 ? '财税管理' : options.videoType == 3 ? '报班计划':'办公文秘',
    })
    this.setData({
      param: params
    })
    //课程了列表
    this.getCouseList()

    //筛选分类
    let param = {
      parentid: options.videoType //考证类视频
    }
    let self = this;
    util.wxReq(api().couseCategory.url, param, 'get', api().couseCategory.hr).then(res => {
      console.log(res.data.data);
      self.setData({
        couseCategoryData: res.data.data
      })
    }).catch(err => {
      console.log(err)
    })

  },
  to_see_video: function(e) {
    if (wx.getStorageSync("token_key")) {
      let img = e.currentTarget.dataset.img;
      if (img) {
        app.globalData.course_img = img
      }
      wx.navigateTo({
        url: `/pages/video_details/video_details?vid=${e.currentTarget.dataset.vid}&vname=${e.currentTarget.dataset.vname}&coursType=${this.data.param.videoType}`,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.navigateTo({
        url: '/pages/author_login/author_login',
      })
    }
    
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
    
  },

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
    let param = this.data.param,
      pageNo = param.pageNo;
    if (this.data.goBottom) {
      param.pageNo = pageNo + 1
      this.setData({
        param: param
      })
      this.getCouseList();
    } else {
      wx.showToast({
        title: '没有更多~',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})