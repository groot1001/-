// pages/register/register.js
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
    nickname: '',
    pwd: '',
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
  // 进入设置昵称密码页面
  // tomodify() {
  //   wx.navigateTo({
  //     url: '../registersetting/registersetting'
  //   })
  // },
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
  getCode() { //获取验证码
    let phonetemp = this.data.phoneNum;
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
    }else{
      let phoneparam = {
        phone: phonetemp
      }
      util.wxReq(api.registerCode.url, phoneparam, "get", api.registerCode.hr).then(res => {
        console.log(res);
        let that = this;
        if (res.data.code == '00000' && (/^1[34578]\d{9}$/.test(phonetemp))) {
          wx.showToast({
            title: '发送成功，请注意查收',
            icon: 'none',
            success: function () {
              that.time();
            }
          })
          // that.time();
        } else if (res.data.code == '10003') {
          wx.showToast({
            title: '账号已存在，请直接登录',
            icon: 'none'
          })
        } else { }
      })
    }
  },
  // 倒计时
  time() {
    let currentTime = this.data.currentTime,
      that = this,
      datatemp = this.data.datatemp;
    let interval = setInterval(function() {
      datatemp.currentTime = datatemp.currentTime-1;
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
  // 进入注册第二步完善阶段
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
  //       url: `../registersetting/registersetting?phone=${pho}&code=${cod}`,
  //     })
  //   };
  // },
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
    let phonetemp = this.data.phoneNum,
      codetemp = this.data.phonecode,
      nametemp = this.data.nickname,
      pwdtemp = this.data.pwd;
    if (this.data.phoneNum == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
    } else if (this.data.phonecode == '') {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
    } else if (this.data.nickname == '') {
      wx.showToast({
        title: '昵称不能为空',
        icon: 'none'
      })
    } else if (this.data.pwd == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
    } else {
      let param = {
        phone: phonetemp,
        smsCode: codetemp,
        name: nametemp,
        pwd: md5.hexMD5(pwdtemp)
      };
      console.log(param);
      util.wxReq(api.userregister.url, param, "get", api.userregister.hr).then(res => {
        console.log(res);
        if (res.data.code == '00000') {
          wx.showToast({
            title: '注册成功',
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