// pages/newpolicy/newpolicy.js
const util = require("../../utils/util.js"),
  api = require("../../api/myinfoApi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    policylist: []
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
  // 获取列表
  getList() {
    let param = {
        pageNo: 1,
        pageSize: 10
      },
      that = this;
    util.wxReq(api().newpolicyList.url, param, "get", api().newpolicyList.hr).then(res => {
      console.log(res);
      let policylist = res.data.data;
      that.setData({
        policylist
      })
    })
  },
  // 跳转最新政策详情
  topolicydetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../newpolicydetail/newpolicydetail?id='+id
    })
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