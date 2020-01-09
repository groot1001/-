// pages/questionbank/questionbank.js
const app = getApp(),
  util = require('../../utils/util.js'),
  cf = require("../../api/apiConfig.js"),
  api = require("../../api/questionApi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    open_modal: false,
    maxClass: [],
    minClass: [],
    this_id: 0,
    this_id_min: 0,
    maxcClassIndex: 0,
    minClassIndex: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      winHeight: wx.getSystemInfoSync().windowHeight
    })


  },
  to_questionbank_list: function(e) {
    // this.setData({ open_modal: !this.data.open_modal})
    if (wx.getStorageSync("token_key")) {
      let id = e.currentTarget.dataset.id,
        tit = e.currentTarget.dataset.tit;
      wx.navigateTo({
        url: `/pages/questionbank_list/questionbank_list?id=${id}&title=${tit}`,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.navigateTo({
        url: '/pages/author_login/author_login',
      })
    }


  },
  findstore: function(e) { //点击大分类
    let vcid = e.currentTarget.dataset.vcid,
      itidata = this.data.maxClass,
      indexmax = e.currentTarget.dataset.indexmax;

    this.setData({
      this_id: vcid,
      maxcClassIndex: indexmax
    })
    this.getCourseQuestionCategory(itidata[indexmax].courseCategoryData[0].id)
  },
  findstore_min: function (e) {//点击二分类
    let vcid = e.currentTarget.dataset.vcid,
      // itidata = this.data.maxClass,
      indexmin = e.currentTarget.dataset.indexmin;
  
    this.setData({ minClassIndex: indexmin, this_id_min: vcid})
    this.getCourseQuestionCategory(vcid);
  },
  //大类列表包含二级类,三级分类
  getCourseQuestionList: function() {
    let that = this;
    util.wxReq(api().getCourseQuestionList.url, {}, 'get', api().getCourseQuestionList.hr).then(res => {
      if (res.data.code === '00000') {
        // console.log(res.data.data);
        let itindata = res.data.data;
        that.setData({
          maxClass: itindata
        })
        return itindata;
      }
    }).then(res => {
      that.getCourseQuestionCategory(res[that.data.maxcClassIndex].courseCategoryData[that.data.minClassIndex].id);
    }).catch(err => {
      console.log(err)
    })
  },

  //三级类
  getCourseQuestionCategory: function(id) {
    let pame = {
      id
    };
    let that=this;
    util.wxReq(api().getCourseQuestionCategory.url, pame, 'get', api().getCourseQuestionCategory.hr).then(res => {
      if (res.data.code === '00000') {
        // console.log(res.data.data)
        that.setData({
          minClass: res.data.data
        })
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
    this.getCourseQuestionList();
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