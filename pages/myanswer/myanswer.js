// pages/myanswer/myanswer.js
const util = require('../../utils/util.js'),
  cf = require("../../api/apiConfig.js"),
  api = require("../../api/myinfoApi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param:{
      keyword:''
    },
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getList();
  },
  // 请求答疑板块数据
  getList() {
    wx.showLoading({
      title: '加载中',
    });
    let param = this.data.param,
      that = this;
    util.wxReq(api().myanswerList.url, param, "get", api().myanswerList.hr).then(res => {
      if (res.statusCode === 200) {
        wx.hideLoading();
        let dataList = res.data.data;
        console.log(res.data.data);
        let regex = /\/Upload./;
        let imgpath = cf._www
        // console.log(newanswerList[2].photo.match(regex))
        for (let n of dataList) {
          if (n.photo != null) {
            if (n.photo.match(regex) != null) {
              imgpath += n.photo.match(regex).input;
              n.photo = imgpath
            }
          }

        }
        that.setData({
          dataList: dataList
        })
      } 
    })
  },
  // 答疑详情跳转
  todatail(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      // url: '../answer-det/answer-det?id=' + e.currentTarget.dataset.id,
      url: '/pages/answer-det/answer-det?id=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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