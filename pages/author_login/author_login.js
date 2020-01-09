// pages/author_login/author_login.js
const util = require('../../utils/util.js'),
  cf = require("../../api/apiConfig.js"),
  api = require("../../api/apiList.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '学乐佳会计',
    avatarUrl: '../../images/aboutUsLogo.png',
    author: false,
    fpath: '',
    toLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let pages = getCurrentPages(),
      len = pages.length > 1 ? pages.length - 2 : 0,
      to_path
    if (len != 0) {
      to_path = pages[len].route
    } else {
      to_path = app.globalData.fpath
    }
    console.log(pages[len].route)
    this.setData({
      fpath: to_path

    })
  },
  // 用户授权
  getUserInfo: function(e) {
    console.log(e);
    console.log(app.globalData.userInfo);
    // app.globalData.userInfo = e.detail.userInfo;
    if (e.detail.errMsg == "getUserInfo:ok") {
      let param = {
        session_key: app.globalData.userInfo.session_key,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        openId: app.globalData.userInfo.openid
      }
      let that = this;
      util.wxReq(api.getUserInfo.url, param, 'get', api.getUserInfo.hr).then(res => {
        console.log(res, 'getget');
        let {
          avatarUrl,
          city,
          nickName,
          gender
        } = res.data.data;

        // app.globalData.userInfo = {
        //   avatarUrl,
        //   city,
        //   nickName,
        //   gender,
        // }
        // app.globalData.userInfo.token = token;
        // app.globalData.userInfo.avatarUrl = userHeadImg;
        // app.globalData.userInfo.nickName = userName;
        // wx.setStorageSync('token_key', token);
        that.setData({
          avatarUrl,
          nickName,
          author: true,
        })

      }).catch(err => {
        console.log(err)
      })
    } else {
      wx.showToast({
        title: '请继续登录哦~',
        icon: 'none'
      })
    }
  },
  // 手机授权
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      let param = {
        session_key: app.globalData.userInfo.session_key,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        openId: app.globalData.userInfo.openid
      }
      let that = this;

      util.wxReq(api.getAnthonPhone.url, param, 'get', api.getAnthonPhone.hr).then(res => {
        console.log(res, '手机授权');

        if (res.data.code == '00000') {
          let {
            token,
            userHeadImg,
            userName
          } = res.data.data;

          app.globalData.userInfo.token = token;
          app.globalData.userInfo.avatarUrl = userHeadImg;
          app.globalData.userInfo.nickName = userName;
          wx.setStorageSync('token_key', token);

          if (that.data.fpath == 'pages/logining/logining') {
            wx.switchTab({
              url: '/pages/index/index'
            })
          } else if (that.data.fpath == 'pages/author_login/author_login') {
            wx.switchTab({
              url: '/pages/index/index'
            })
          } else if (that.data.fpath == 'pages/video_list/video_list') {
            wx.switchTab({
              url: '/pages/index/index'
            })
          } else {
            wx.switchTab({
              url: '/' + that.data.fpath,
              fail() {
                if (that.data.fpath === 'pages/video_details/video_details') {
                  wx.redirectTo({
                    url: `/${that.data.fpath}?vid=${app.globalData.pageInfo.query.vid}&vname=${app.globalData.pageInfo.query.vname}`,
                    success: function(res) {},
                    fail: function(res) {},
                    complete: function(res) {},
                  })
                } else if (that.data.fpath === 'pages/video_details/video_details') {
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



        }

      }).catch(err => {
        console.log(err)
      })
    } else {
      wx.showToast({
        title: '请继续绑定登录哦~',
        icon: 'none'
      })
    }
  },
  tologin() {
    this.setData({
      toLogin: true
    })
    wx.redirectTo({
      url: '../logining/logining'
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
    // if (this.data.toLogin) {
    //   return false;
    // }
    // if (wx.getStorageSync('token_key') == '') {
    //   wx.showToast({
    //     title: '您未授权且未绑定手机，暂时无法获取更多免费课程',
    //     icon: 'none',
    //     duration: 2500

    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (this.data.toLogin) {
      return false;
    }
    if (wx.getStorageSync('token_key') == '') {
      wx.showToast({
        title: '您未授权且未绑定手机，暂时无法获取更多免费课程',
        icon: 'none',
        duration: 2500

      })
    }
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