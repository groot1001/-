// miniprogram/pages/wode/wode.js
const cf = require("../../api/apiConfig.js"),
 util = require("../../utils/util.js"),
  api = require("../../api/apiList.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: false,
    nickname:'',
    headpic:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!wx.getStorageSync("token_key")) {
      wx.navigateTo({
        url: '/pages/author_login/author_login'
      })
    }
  },
  switchLogon:function(){
    let that = this;
    wx.showModal({
      title: '提示',
      content: '即将退出当前账号，是否继续？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.setStorageSync('token_key', '');
          wx.setStorageSync('user_account', {
            name: '',
            pwd: ''
          });
          that.wx_logo();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  wx_logo(){
    let that=this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        let param = {
          js_code: res.code
        }
        util.wxReq(api.login.url, param, 'get', api.login.hr).then(res => {
          // console.log(res)
          //  if(res.code==='00000')
          let {
            session_key,
            openid,
            userName,
            userHeadImg,
            token
          } = res.data.data;

          console.log(app.globalData)

          app.globalData.userInfo = {
            openid,
            session_key,
            nickName: userName || '',
            avatarUrl: userHeadImg || ''
          }
          wx.redirectTo({

            url: '/pages/author_login/author_login',
          })
        }).catch(err => {
          console.log(err)
        })
      }
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
    wx.setNavigationBarTitle({
      title: '我的'
    })
    if (wx.getStorageSync('token_key') != '') {
      // 判断不为微信授权登录获取头像时，拼接默认不全图像路径
      console.log('-------------')
      let imgpath = cf._www
      if (app.globalData.userInfo.avatarUrl) {
        if (!app.globalData.userInfo.avatarUrl.startsWith("http")) {//es6
          imgpath += app.globalData.userInfo.avatarUrl
          app.globalData.userInfo.avatarUrl = imgpath

        }
      }
      this.setData({
        islogin: true,
        headpic: app.globalData.userInfo.avatarUrl,
        nickname: app.globalData.userInfo.nickName
      })
    }
  
  },
  // 进入登录页面
  login() {
    wx.navigateTo({
      url: '../logining/logining'
    })
  },
  // 进入注册页面
  register() {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  toplay() {
    if (wx.getStorageSync("token_key")) {
      wx.navigateTo({
        url: '../myplay/myplay'
      })
    } else {
      wx.navigateTo({
        url: '/pages/author_login/author_login',
      })
    }
  },
  tocourse() {
    if (wx.getStorageSync("token_key")) {
      wx.navigateTo({
        url: '../mycourse/mycourse'
      })
    } else {
      wx.navigateTo({
        url: '/pages/author_login/author_login',
      })
    }
  },
  tocollect() {
    if (wx.getStorageSync("token_key")) {
      wx.navigateTo({
        url: '../mycollect/mycollect'
      })
    } else {
      wx.navigateTo({
        url: '/pages/author_login/author_login',
      })
    }
  },
  toconcern() {
    if (wx.getStorageSync("token_key")) {
      wx.navigateTo({
        url: '../myanswer/myanswer'
      })
    } else {
      wx.navigateTo({
        url: '/pages/author_login/author_login',
      })
    }
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