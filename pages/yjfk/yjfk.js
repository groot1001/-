// miniprogram/pages/yjfk/yjfk.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    problems:[
      {name:"course_problem",value:"课程反馈"},
      {name:"question_bank_problem",value:"题库反馈"},
      {name:"play_problem",value:"播放反馈"},
      {name:"use_problem",value:"使用反馈"},
      {name:"other_problem",value:"其他反馈"}
  
    ]
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '意见反馈'
    })
  },
  radioChange(e) {
    console.log('您选择了：', e.detail.value)
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