// miniprogram/pages/gkjl/gkjl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gkjl: [{
        time: '2019-02-22',
        ship: [{
          src: '../../images/ship-1.png',
          title: '建筑施工真账实操',
          fs: '5.0分',
          star: [{
            img: '../../images/star.png'
          }, {
            img: '../../images/star.png'
          }, {
            img: '../../images/star.png'
          }, {
            img: '../../images/star.png'
          }, {
            img: '../../images/star.png'
          }],
          fs: '5.0分',
          zz: '朱长江',
          peo: '1314523人学习'
        }]
      },
      {
        time: '2019-02-21',
        ship: [{
          src: '../../images/ship-2.png',
          title: '会计概念与目标',
          fs: '5.0分',
          star: [{
            img: '../../images/star.png'
          }, {
            img: '../../images/star.png'
          }],
          fs: '2.0分',
          zz: '朱长江',
          peo: '1314523人学习'
        }, {
          src: '../../images/ship-2.png',
          title: '会计概念与目标',
          fs: '5.0分',
          star: [{
            img: '../../images/star.png'
          }, {
            img: '../../images/star.png'
          }],
          fs: '2.0分',
          zz: '朱长江',
          peo: '1314523人学习'
        }]
      },
      {
        time: '2019-02-20',
        ship: [{
          src: '../../images/ship-1.png',
          title: '建筑施工真账实操',
          fs: '5.0分',
          star: [{
            img: '../../images/star.png'
          }, {
            img: '../../images/star.png'
          }, {
            img: '../../images/star.png'
          }, {
            img: '../../images/star.png'
          }, {
            img: '../../images/star.png'
          }],
          fs: '5.0分',
          zz: '朱长江',
          peo: '1314523人学习'
        }]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '观看记录'
    })
  },
  to_kecheng_info:function(){
    wx.navigateTo({
      url: '/pages/video_details/video_details',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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