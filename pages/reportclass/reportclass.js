// pages/reportclass/reportclass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tuiclass: [{
        url: '../../images/class-1.png',
        text1: "2019年初级会计职称-经济法基础...",
        text2: "主讲：朱长江老师",
        text3: '905583人学习'
      },
      {
        url: '../../images/class-2.png',
        text1: "2019年初级会计职称-经济法基础...",
        text2: "主讲：朱长江老师",
        text3: '905583人学习'
      },
      {
        url: '../../images/class-3.jpg',
        text1: "2019年初级会计职称-经济法基础...",
        text2: "主讲：朱长江老师",
        text3: '905583人学习'
      },
    ]
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
     wx.showToast({
       title: '没有更多啦',
       icon:'none'
     })
  }, 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})