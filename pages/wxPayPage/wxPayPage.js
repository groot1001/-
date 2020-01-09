// pages/wxPayPage/wxPayPage.js
const util = require('../../utils/util.js'),
  cf = require("../../api/apiConfig.js");
let api = require("../../api/videoCourseApi.js"),
  indexApi = require("../../api/apiList.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: '',

    cousePicDetails: {},
    avatarUrl: '',
    nickName: '',
    phone: '15500000000',
    studyNum: '',
    chapter: '',
    isDeveloper: 0,
    open_modal: false,
    type: '',
    session_key: '',
    openid: '',
    ctitle:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserAuthors();
    let {
      avatarUrl,
      nickName
    } = app.globalData.userInfo;

    let imgpath = cf._www
    if (avatarUrl) {
      if (!avatarUrl.startsWith("http")) { //es6
        imgpath += app.globalData.userInfo.avatarUrl
        avatarUrl = imgpath
      }
    }else{
      avatarUrl ='../../images/wode-txbag.png'
    }

    this.setData({
      cid: options.id,
      type: options.types,
      nickName,
      avatarUrl,
      ctitle: options.ctitle,
      course_img: app.globalData.course_img,
      studyNum: options.studyNum,
      chapter: options.chapter,
      winHeight: wx.getSystemInfoSync().windowHeight,
      // open_modal:true
    })
    let param = {
      id: options.id,
      type: 1, //课程类型（1课程，3报班）
      isScore: 0
    }
    let self = this;
    util.wxReq(api().course_pic.url, param, 'get', api().course_pic.hr).then(res => { //课程价格信息
      self.setData({
        cousePicDetails: res.data.data
      })
    }).catch(err => {
      console.log(err)
    })
  },

  getUserAuthors() { //查看用户是否使用过微信授权登录
    let self = this;
    util.wxReq(api().getUserDevelopers.url, '', 'get', api().getUserDevelopers.hr).then(res => {
      console.log(res);
      let open_modal = self.data.open_modal;
      if (res.data.data.isDeveloper == 0) {
        // open_modal = true;
        wx.login({
          success: res01 => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            // console.log(res01.code, '000000000000000')
            let param = {
              js_code: res01.code
            }
            util.wxReq(indexApi.login.url, param, 'get', indexApi.login.hr).then(res => {
              let {
                session_key,
                openid
              } = res.data.data;
              console.log(res.data.data)
              // console.log(openid, '-----------------------', session_key)
              // self.setData({
              //   session_key,
              //   openid
              // })
              let param = {
                // session_key:session_key,
                openId: openid,
                // userHeadImg: rest.userInfo.avatarUrl,
                // userName: rest.userInfo.nickName
              }
              let that = this;
              util.wxReq(api().getAnthonUserInfo.url, param, 'get', api().getAnthonUserInfo.hr).then(res => {
                console.log(res, 'getget');
                // let {
                //   avatarUrl,
                //   city,
                //   nickName,
                //   gender
                // } = res.data.data;
                //  console.log()
              }).catch(err => {
                console.log(err)
              })

            }).catch(err => {
              console.log(err)
            })
          }
        })
      }
      self.setData({
        phone: res.data.data.phone,
        isDeveloper: res.data.data.isDeveloper,
        open_modal
      })
    }).catch(err => {
      console.log(err)
    })
  },
  make_modal() {
    this.setData({
      open_modal: !this.data.open_modal
    })
  },
  //支付按钮
  payBtn() {

    let self = this;
    let pame = {
      curriculumId: self.data.cid,
      curriculumType: self.data.type
    }
    util.wxReq(api().payOrder.url, pame, 'get', api().payOrder.hr).then(res => {
      console.log(res);
      let po = res.data.data;
      console.log(po);
      wx.requestPayment({
        timeStamp: po.timeStamp,
        nonceStr: po.nonceStr,
        package: po.package,
        signType: 'MD5',
        paySign: po.paySign,
        success(res) {
          
          wx.reLaunch({
            url: `/pages/video_details/video_details?vid=${self.data.cid}&coursType=${self.data.type}&vname=${self.data.ctitle}`,
            success: function(res) {
              
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        },
        fail(res) {}
      })

    }).catch(err => {
      console.log(err)
    })

    // if (this.data.isDeveloper == 0) {
    //   this.setData({
    //     open_modal: true
    //   })
    // } else {

    // }
  },
  getUserInfo(e) {
    console.log(e,'---------------');
    // if (e.detail.errMsg == "getUserInfo:ok") {
    //   let param = {
    //     session_key: this.data.session_key,
    //     encryptedData: e.detail.encryptedData,
    //     iv: e.detail.iv,
    //     openId: this.data.openid
    //   }
    //   let that = this;
    //   util.wxReq(api().getAnthonUserInfo.url, param, 'get', api().getAnthonUserInfo.hr).then(res => {
    //     console.log(res, 'getget');
    //     // let {
    //     //   avatarUrl,
    //     //   city,
    //     //   nickName,
    //     //   gender
    //     // } = res.data.data;
    //     //  console.log()
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // } else {
    //   wx.showToast({
    //     title: '请继续登录哦~',
    //     icon: 'none'
    //   })
    // }


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
  // onShareAppMessage: function() {

  // }
})