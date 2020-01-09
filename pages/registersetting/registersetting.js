// pages/registersetting/registersetting.js
const util = require("../../utils/util.js"),
  api = require("../../api/phoneloginApi.js"),
  md5 = require("../../utils/md5.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    nickname: '',
    pwd: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.setData({
      phone: options.phone,
      code: options.code
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
  bindnickname(e) {
    console.log(e.detail.value);
    this.setData({
      nickname: e.detail.value
    })
  },
  bindpsd(e) {
    console.log(e.detail.value);
    this.setData({
      pwd: e.detail.value
    })
  },
  // 注册
  finishregister() {
    let phonetemp = md5.hexMD5(this.data.phone),
      codetemp = this.data.code,
      nametemp = this.data.nickname,
      pwdtemp = md5.hexMD5(this.data.pwd);
    let param = {
      phone: phonetemp,
      smsCode: codetemp,
      name: nametemp,
      pwd: pwdtemp
    };
    console.log(param);
    util.wxReq(api().userregister.url, param, "get", api().userregister.hr).then(res => {
      console.log(res);
      if (res.data.code == '00000') {
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              //要延时执行的代码
              wx.switchTab({
                url: '../index/index'
              })
            }, 2000) //延迟时间
          }
        })
      }else{
        wx.showToast({
          title: res.data.message,
          icon:'none'
        })
      }
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