// pages/logining/logining.js
const util = require("../../utils/util.js"),
  api = require("../../api/phoneloginApi.js"),
  md5 = require("../../utils/md5.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    psd: '',
    fpath: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.pageInfo);
    let pages = getCurrentPages(),
      len = pages.length == 2 ? pages.length - 2 : pages.length == 3 ? pages.length - 3 : 0,
      to_path;

    if (len == 0) {
      to_path = app.globalData.fpath
    } else {
      to_path = pages[len].route
    }


    console.log(pages[len].route)
    this.setData({
      fpath: to_path

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  // 进入注册页面
  register() {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  // 忘记密码入口
  modifypsd() {
    wx.navigateTo({
      url: '../testpsd/testpsd'
    })
  },
  // 
  bindPhone(e) {
    console.log(e.detail.value);
    this.setData({
      phone: e.detail.value
    })
  },
  bindPsd(e) {
    console.log(e.detail.value);
    this.setData({
      psd: e.detail.value
    })
  },
  // 登录
  login() {
    let phonetemp = this.data.phone,
      psdtemp = md5.hexMD5(this.data.psd);
    console.log(phonetemp, psdtemp);
    // E10ADC3949BA59ABBE56E057F20F883E
    // 15072186142
    if (phonetemp == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
    } else if (psdtemp == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
    };
    let param = {
      phone: phonetemp,
      pwd: psdtemp,
      sourse: 'android_onepulas'
    };
    util.wxReq(api.userlogin.url, param, "get", api.userlogin.hr).then(res => {

      console.log(res.data.code);
      let that = this;
      if (res.data.code == '00000') {
        console.log('00000000');
        let {
          token,
          name,
          photo
        } = res.data.data;
        wx.setStorageSync('token_key', token);
        app.globalData.userInfo.nickName = name;
        app.globalData.userInfo.avatarUrl = photo;
        // app.globalData.userInfo = {
        //   nickName: name,
        //   avatarUrl:  photo
        // }
        let accountStorage = {
          name: phonetemp,
          pwd: psdtemp
        };
        wx.setStorageSync('user_account', accountStorage);
        if (that.data.fpath == 'pages/logining/logining') {
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else if (that.data.fpath == 'pages/author_login/author_login') {
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else {
          wx.switchTab({
            url: '/' + that.data.fpath,
            fail() {
              console.log('11111');
              if (that.data.fpath === 'pages/video_details/video_details') {
                wx.redirectTo({
                  url: `/${that.data.fpath}?vid=${app.globalData.pageInfo.query.vid}&vname=${app.globalData.pageInfo.query.vname}`,
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
                })
              } else if (that.data.fpath === 'pages/answer-det/answer-det') {
                wx.redirectTo({
                  url: `/${that.data.fpath}?id=${app.globalData.pageInfo.query.id}`,
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
                })
              } else if (that.data.fpath === 'pages/question/question') {
                wx.redirectTo({
                  url: `/${that.data.fpath}?qid=${app.globalData.question.qid}&qtitle=${app.globalData.question.qtit}`,
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
                })
              } else {
                wx.redirectTo({
                  url: `/${that.data.fpath}`,
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
                })
              }

            }

          })
        }

      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }
    })
  },
  togrant() {
    wx.redirectTo({
      url: '../author_login/author_login'
    })
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