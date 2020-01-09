// pages/teacherInfo/teacherInfo.js
const app = getApp(),
  util = require('../../utils/util.js'),
  cf = require("../../api/apiConfig.js"),
  api = require("../../api/teacherApi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherData:{},
    media_www: cf._www
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.tid)
    this.getTeacherinfo(options.tid);
  },
  getTeacherinfo: function (tid) {
    wx.showLoading({
      title: '加载中！',
    })
    let parame={
      id:tid
    }
    let self = this;
    util.wxReq(api().teacherIntroduce.url, parame,'get', api().teacherIntroduce.hr).then(res => {
      if (res.data.code === '00000') {
        let teacherArr = res.data.data;
        console.log(teacherArr);
        self.setData({
          teacherData: teacherArr
        })
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err)
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})