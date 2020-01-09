//app.js
const util = require('/utils/util.js'),
  cf = require("/api/apiConfig.js"),
  papi = require("/api/phoneloginApi.js"),
  api = require("/api/apiList.js");
App({
  onLaunch: function(e) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that = this;

    this.globalData.fpath = e.path;
    this.globalData.pageInfo = e;
    let {
      name,
      pwd
    } = wx.getStorageSync('user_account');

    if (name) { //如果缓存存在账号就使用
      let param = {
        phone: name,
        pwd: pwd,
        source: 'android_onepulas'
      }
      util.wxReq(papi.userlogin.url, param, 'get', papi.userlogin.hr).then(res => { //缓存登录
        let {
          token,
          name,
          photo
        } = res.data.data;
        wx.setStorageSync('token_key', token);
        that.globalData.userInfo = {
          nickName: name,
          avatarUrl: photo
        }
      }).catch(err => {
        console.log(err)
      })
    } else {
     
      // 登录
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
            
          
          
            that.globalData.userInfo = {
              openid,
              session_key,
              nickName: userName||'',
              avatarUrl: userHeadImg||''
            }
            
            // wx.getSetting({
            //   success: (res) => {
            //     if (!res.authSetting['scope.userInfo']) {
            //       wx.navigateTo({
            //         url: '/pages/author_login/author_login',
            //       })
            //     }
            //   }
            // })
            if (!token) {
              wx.redirectTo({
              
                url: '/pages/author_login/author_login',
              })

            } else {
              wx.setStorageSync('token_key', token);
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  },
  userAuthorize: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log('-----------------------------')
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userDetails: null,
    fpath: null,
    pageInfo:null,
    question:{},
    course_img:'https://www.xuelejia.com/Upload/Banner/201806041342103263.png'
  }
})