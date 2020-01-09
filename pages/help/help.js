// miniprogram/pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    help: [
      { wenti: '1、学乐佳会员该如何登录？', neir: '学乐佳登录方式：我的→登录→手机号登录。（学乐佳会员如果微信是手机号注册的，也可以使用微信登录）'},
      { wenti: '2、我是学乐佳会计学员，不小心选择了微信授权登录，登录后无法退出重新登录？', neir: '解决方法：联系我们客服，我们客服将会为您账户解绑，再重新登录。' },
      { wenti: '3、我是非学乐佳学员，使用了微信登录，电话授权绑定后，那么我的账号密码是？', neir: '账号为您的绑定微信的手机号，初始密码默认是123456；（如无法登录，可联系我们客服给您处理）' }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '帮助中心'
    })
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