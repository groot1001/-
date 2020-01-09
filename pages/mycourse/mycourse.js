// pages/mycourse/mycourse.js
const util = require('../../utils/util.js'),
  api = require("../../api/myinfoApi.js");
  var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mycourseList: [], //我当然课程列表数据
    param: {
      pageNo: 1,
      pageSize: 10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.getList();
  },
  // 获取数据
  getList() {
    // wx.showLoading({
    //   title: '加载中',
    // });
    let param = this.data.param,
      that = this;
    util.wxReq(api().mycourseList.url, param, "get", api().mycourseList.hr).then(res => {
      console.log(res);
      let mycourseList = res.data.data;
      mycourseList.forEach((item, index) => { //处理小位点
        console.log(item);
        item.checked = true;
        item.curriculumData.forEach(item1 => {
          console.log(item1);
          if (item1.star == null) {
            item1.star = (0).toFixed(1)
          } else {
            item1.star = (item1.star).toFixed(1); //处理小位点            
          }
        })
      })

      that.setData({
        mycourseList
      })
      console.log(that.data.mycourseList);
    })
  },
  // 
  animatelist(e) {
    console.log(e);
    let mycourseList = this.data.mycourseList,
      ind = e.currentTarget.dataset.ind;
    mycourseList.forEach((item, index) => { //处理小位点
      if (index == ind) {
        item.checked = !item.checked;
      }
    })
    this.setData({
      mycourseList
    })
  },
  // 跳转我的课程详情
  tovideodetail(e) {
    console.log(e.currentTarget.dataset.types);
    let img = e.currentTarget.dataset.img;
    if (img) {
      app.globalData.course_img = img
    }
    wx.navigateTo({
      url: `/pages/video_details/video_details?vid=${e.currentTarget.dataset.id}&coursType=${e.currentTarget.dataset.types}&vname=${e.currentTarget.dataset.vname}`
    })
  },
  // 处理星星
  // countstar(){
  //   let mycourseList = this.data.mycourseList;
  //   mycourseList.forEach()
  // },
  //
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