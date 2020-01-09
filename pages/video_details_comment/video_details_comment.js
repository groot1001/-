// pages/video_details_comment/video_details_comment.js
const util = require('../../utils/util.js'),
  // cf = require("../../api/apiConfig.js"),
  api = require("../../api/videoCourseApi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment_val: '',
    videoId: '',
    difficulty: 0,
    qq:''
  },
  comment_submit: function(e) {

    let commVla = e.detail.value.comment_content || '';
    let QQ = e.detail.value.qq || ''
    console.log(commVla)
    if (commVla.length <10) {
      wx.showToast({
        title: '请输入10个字',
        icon: 'none',
        duration: 2000
      })
    } else {
      let param = {
        difficulty: this.data.difficulty,
        content: commVla,
        userqq: QQ,
        videoId: this.data.videoId
      }
      let self=this;
      util.wxReq(api().addCurriculumQuestion.url, param, 'get', api().addCurriculumQuestion.hr).then(res => {
        self.setData({
          comment_val: '',
          qq: ''
        })
        console.log(res.data.message)
        wx.showToast({
          title: res.data.message,
          duration: 1000,
          
        })
        if (res.data.code === '00000') {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1200)
        }
      })
    }

  },

  difficulty_select: function(e) {
    let difficulty = e.currentTarget.dataset.difficulty;
    this.setData({
      difficulty
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      videoId: options.vid
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