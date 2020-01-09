// pages/newpolicydetail/newpolicydetail.js
const util = require("../../utils/util.js"),
      api = require("../../api/myinfoApi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    policyid: '',
    policydetaildata: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.id);
    let id = options.id;
    this.setData({
      policyid: id
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
    this.getList();
  },
// 获取最新政策详情列表
getList(){
  let param = {
    id:this.data.policyid
  },that = this;
  util.wxReq(api().newpolicydetailList.url, param, "get", api().newpolicydetailList.hr).then(res=>{
     console.log(res);
     that.setData({
       newpolicydetailList:res.data.data
     })
    console.log(that.data.newpolicydetailList);
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