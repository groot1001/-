// pages/testpsd/testpsd.js
const util = require("../../utils/util.js"),
  api = require("../../api/phoneloginApi.js"),
  md5 = require("../../utils/md5.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    phonecode: '',
    newpsd: '',
    timetxt: '发送验证码',
    datatemp: {
      timetxt: '发送验证码',
      currentTime: 60,
      btncolor: 'rgb(60, 135, 202)',
      disabled: false
    }
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
  // 进入修改密码页面
  tomodify() {
    wx.navigateTo({
      url: '../editpsd/editpsd'
    })
  },
  bindPhone(e) {
    console.log(e.detail.value);
    this.setData({
      phoneNum: e.detail.value
    })
  },
  bindCode(e) {
    console.log(e.detail.value);
    this.setData({
      phonecode: e.detail.value
    })
  },
  bindnewpsd(e) { //新密码
    console.log(e.detail.value);
    this.setData({
      newpsd: e.detail.value
    })
  },
  getCode() { //获取验证码
    if (this.data.phoneNum == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
    } else if (!(/^1[34578]\d{9}$/.test(this.data.phoneNum)) || this.data.phoneNum.length != 11) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none'
      })
    } else {
      let phoneparam = {
        phone: this.data.phoneNum
      };
      util.wxReq(api.forgetCode.url, phoneparam, "get", api.forgetCode.hr).then(res => {
        console.log(res);
        let that = this;
        if (res.data.code == '00000') {
          wx.showToast({
            title: '发送成功，请注意查收',
            icon: 'none',
            success: function() {
              that.time();
            }
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      })
    }
  },
  // 倒计时
  time() {
    let currentTime = this.data.currentTime,
      that = this,
      datatemp = this.data.datatemp;
    let interval = setInterval(function() {
      datatemp.currentTime = datatemp.currentTime - 1;
      datatemp.timetxt = datatemp.currentTime + 's';
      datatemp.btncolor = 'rgb(0,0,0,0.2)';
      datatemp.disabled = true;
      that.setData({
        datatemp
      })
      if (datatemp.currentTime <= 0) {
        clearInterval(interval)
        datatemp.timetxt = '发送验证码';
        datatemp.btncolor = 'rgb(60, 135, 202)';
        datatemp.currentTime = 60;
        datatemp.disabled = false;
        that.setData({
          datatemp
        })
      }
    }, 1000)
  },
  // 进入密码修改页面
  // toregister() {
  //   // E10ADC3949BA59ABBE56E057F20F883E
  //   // 15072186142
  //   if (this.data.phoneNum == '') {
  //     wx.showToast({
  //       title: '手机号不能为空',
  //       icon: 'none'
  //     })
  //   } else if (this.data.phonecode == '') {
  //     wx.showToast({
  //       title: '验证码不能为空',
  //       icon: 'none'
  //     })
  //   } else {
  //     let pho = this.data.phoneNum,
  //       cod = this.data.phonecode;
  //     wx.navigateTo({
  //       url: `../editpsd/editpsd?phone=${pho}&code=${cod}`,
  //     })
  //   };
  // },
  postnewpsd() { //修改密码
    let phonetemp = this.data.phoneNum,
      codetemp = this.data.phonecode,
      pwdtemp = this.data.newpsd;
    if (phonetemp == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
    } else if (!(/^1[34578]\d{9}$/.test(phonetemp)) || phonetemp.length != 11) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none'
      })
    } else if (codetemp == '') {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
    } else if (pwdtemp == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
    } else {
      let param = {
        phone: phonetemp,
        smsCode: codetemp,
        pwd: md5.hexMD5(pwdtemp)
      };
      console.log(param);
      util.wxReq(api.usernewpsd.url, param, "get", api.usernewpsd.hr).then(res => {
        console.log(res);
        if (res.data.code == '00000') {
          wx.showToast({
            title: '修改密码成功',
            icon: 'success',
            duration: 2000,
            success: function() {
              setTimeout(function() {
                //要延时执行的代码
                wx.redirectTo({
                  url: '../logining/logining'
                })
              }, 2000) //延迟时间
            }
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      })
    };
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