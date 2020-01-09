// pages/sendarea/sendarea.js
const util = require('../../utils/util.js'),
  api = require("../../api/answerApi.js"),
  affix = require("../../api/apiConfig.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // questionCategroyItems: [], //问题分类id
    // topictype: 0, //选中问题类型id
    quetit: '', //问题标题
    quecontent: '', //问题内容
    queimage: '', //问题图片
    spin: {},
    position: 'back',
    imgs: [],
    choose: false,
    photoTaken: false,
    current: '',
    screenheight: '',
    tempImagePath: ''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    // 调用请求问题分类
    // this.getcategory();
    // 获取页面高度
    let screenheight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      screenheight,
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
  // 获取问题分类数据
  // getcategory() {
  //   let that = this;
  //   util.wxReq(api.questionCategory.url, "get", api.questionCategory.hr).then(res => {
  //     if (res.statusCode === 200) {
  //       let quesprop = res.data.data;
  //       console.log(res);
  //       that.setData({
  //         questionCategroyItems: quesprop
  //       })
  //     }
  //   })
  // },
  // 单选函数
  // radioChange: function(e) {
  //   // console.log('radio发生change事件，携带value值为：', e.detail.value);
  //   this.setData({
  //     topictype: e.detail.value
  //   })
  // },
  // 问题标题输入值监听
  titchange: function(e) {
    // console.log(e.detail.value);
    this.setData({
      quetit: e.detail.value
    })
  },
  textareChange: function(e) {
    // console.log(e.detail.value);
    this.setData({
      quecontent: e.detail.value
    })
  },
  // 添加照片按钮函数
  addbtn: function() {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '请选择图片来源',
      confirmText: '拍摄',
      cancelText: '相册',
      confirmColor: '#000000',
      success(res) {
        if (res.confirm) {
          that.takePhoto();
        } else if (res.cancel) {
          that.chooseimg();
        }
      }
    })
  },
  // 选择照片
  chooseimg: function() {
    var that = this;
    let imgs = that.data.imgs;
    if(imgs.length<6){
      wx.chooseImage({
        count: 6,
        //original原图，compressed压缩图 
        sizeType: ['original'],
        //album来源相册 camera相机  
        sourceType: ['album', 'camera'],
        //成功时会回调 
        success: function (res) {
          console.log(res);
          imgs = imgs.concat(res.tempFilePaths);
          console.log(imgs);
          //重绘视图 
          that.setData({
            imgs: imgs,
            choose: false,
            photoTaken: false
          })
          console.log(that.data.imgs[0]);
        }
      })
    }else{
      wx.showToast({
        title: '最多上传6张图片',
        icon: 'none',
        duration: 1000
      })
    }
    console.log("xxx", that.data.imgs);
  },
  // 上传图片,返回链接地址
  upload() {
    let that = this;
    let formdata = { //传给后台本地临时图片地址
      'Filedata': that.data.imgs[0]
    }
    console.log(that.data.imgs[0] === undefined);
    if (that.data.imgs[0] === undefined) {
      that.sendinfo();
    } else {
      util.uploadImage(that.data.imgs, api().uploadmyfile.url).then(res => {
        let queimage = that.acTiveArrStringFun(res);
        console.log('21313', that.acTiveArrStringFun(res));
           that.setData({
             queimage: queimage
           })
        that.sendinfo();
      })
      // util.wx_uplFile(api().uploadmyfile.url, that.data.imgs[0], formdata).then(res => { //返回图片链接接口
      //   let restemp = JSON.parse(res),
      //     queimgtemp = that.data.queimage;
      //   let resdata = restemp.data;
      //   let uploadimage = resdata.returnurl;
      //   if (that.data.queimage == '') {
      //     queimgtemp = affix._www + uploadimage
      //   } else {
      //     queimgtemp = queimgtemp + ',' + affix._www + uploadimage;
      //   }
      //   that.setData({
      //     queimage: queimgtemp
      //   })
      //   that.sendinfo();
      // })
    }
  },
  acTiveArrStringFun: function (obj) {//数组转字符串，以逗号隔开
    var arr = [];
    if (obj != null && obj.length != 0) {
      for (var i = 0; i < obj.length; i++) {
        arr.push(obj[i]);
      }
    }
    return arr.toString();
  },
  // 提交后台数据函数
  sendinfo() {
    let that = this;
    let param = { //提交给后台数据参数
      subject: that.data.quetit,
      content: that.data.quecontent,
      images: that.data.queimage,
      bbstype: 1,
      topicType: 11
    };
    console.log('param:', param);
    util.wxReq(api().sendQuestion.url, param, "get", api().sendQuestion.hr).then(res => {
      if (res.statusCode === 200 && res.data.code == '00000') {
        console.log(res);
        wx.navigateBack({
        })
        that.setData({
          quetit: '',
          quecontent: '',
          imgs: []
        })
      } else {}
    })
  },
  // 删除选定的照片
  delpic: function(e) {
    console.log(e);
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },

  //切换摄像头
  qiehuan: function() {
    var chli = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })

    if (this.data.position == "back") {
      chli.rotateZ(180).step();
      this.setData({
        position: 'front',
        spin: chli
      })
    } else if (this.data.position == "front") {
      chli.rotateZ(-180).step();
      this.setData({
        position: 'back',
        spin: chli
      })
    }

  },
  // 拍照
  takePhoto: function(e) {
    console.log(e);
    var that = this;
    that.setData({
      photoTaken: true
    }), wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: "#000000"
    })
  },
  camera: function() {
    var that = this;
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res);
        var imgs = that.data.imgs;
        console.log(imgs);
        // var a = [];
        // a = a.push(res.tempImagePath)
        console.log(res.tempImagePath);
        imgs = imgs.concat(res.tempImagePath);
        console.log(imgs);
        that.setData({
          imgs: imgs,
          photoTaken: false,
          choose: false
        }), wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: "#ffffff"
        })
      }
    })
  },
  // 取消拍照
  canceltakephoto: function() {
    this.setData({
      photoTaken: false,
      choose: false
    }), wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: "#ffffff"
    })
  },
  // 预览图片
  previewImage: function(e) {
    console.log(e);
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgs // 需要预览的图片http链接列表
    })
  },
  // 发送按钮
  submitcontent: function() {
    let that = this,
      // mid = that.data.topictype,
      quetitTemp = that.data.quetit,
      quecontentTemp = that.data.quecontent,
      queimageTemp = that.data.queimage;
    // console.log("标题：", that.data.quetit, "内容：" + that.data.quecontent + "image:" + that.data.queimage + "mid:" + mid);
    // if (mid == 0) {
    //   wx.showToast({
    //     title: '请选择问题类别',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // } else 
    if (quetitTemp == '') {
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (quecontentTemp == '') {
      wx.showToast({
        title: '问题内容不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      that.upload();
    }
    // let param = {
    //   subject: quetitTemp,
    //   content: quecontentTemp,
    //   images: queimageTemp,
    //   bbstype: 1,
    //   topicType: mid
    // };
    // util.wxReq(api().sendQuestion.url, param, "get", api().sendQuestion.hr).then(res => {
    //   if (res.statusCode === 200 && res.data.code == '00000') {
    //     console.log('提交后图片',queimageTemp);
    //     console.log(res);
    //     wx.navigateBack({
    //       url: '/pages/answer/answer'
    //     })
    //     that.setData({
    //       quetit: '',
    //       quecontent: ''
    //     })
    //   } else {}
    // })
  },
  // 隐藏膜层和拍照按钮
  hideModal: function() {
    this.setData({
      choose: false
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