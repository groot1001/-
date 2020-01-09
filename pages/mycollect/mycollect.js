// pages/mycollect/mycollect.js
const util = require('../../utils/util.js'),
  api = require("../../api/myinfoApi.js");
  var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myvideoList: [], //我的课程列表数据
    myqueList: [], //我的题目数据
    catagorystatus: true, //切换状态
    ismanage: false, //是否进入管理
    ismanage1: false, //题目是否进入管理
    selectAllStatus: false//全选状态

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
    this.getList();
    // this.getQueList();
  },
  // 切换视频
  switchToVideo() {
    this.setData({
      catagorystatus: true,
      ismanage1: false,
      selectAllStatus: false
    })
  },
  // 切换题目
  switchToQue() {
    this.setData({
      catagorystatus: false,
      ismanage: false,
      selectAllStatus: false
    })
  },
  // 是否进入管理
  manage() {

    let ismanage = this.data.ismanage,
      ismanage1 = this.data.ismanage1,
      catagorystatus = this.data.catagorystatus,
      myvideoList = this.data.myvideoList,
      myqueList = this.data.myqueList,
      that = this;
    if (myvideoList.length==0){
      console.log('---------')
      return false;
    }
    if (catagorystatus == true) {
      myvideoList.forEach((item, index) => {
        item.checked = false;
      })
      this.setData({
        ismanage: !ismanage,
        myvideoList
      })
    } else {
      myqueList.forEach((item, index) => {
        item.courseCategoryData.forEach((item1, index) => {
          item1.checked = false;
        })
      })
      this.setData({
        ismanage1: !ismanage1,
        myqueList
      })
    }
    if (that.data.ismanage == false) {
      that.setData({
        selectAllStatus: false
      })
    }
  },
  // 获取视频收藏数据
  getList() {
    wx.showLoading({
      title: '加载中',
    });
    let param = this.data.param,
      that = this;
    util.wxReq(api().myvideoList.url, param, "get", api().myvideoList.hr).then(res => {
      console.log('0000000', res.data.data);
      let myvideoList = res.data.data;
      console.log("视频收藏：", myvideoList);
      // if (res.data.code = '00000') {
        wx.hideLoading();
        myvideoList.forEach((item, index) => {
          if (item.star == null){
            item.star = (0).toFixed(1)
          }else{
            item.star = (item.star).toFixed(1); //处理小位点            
          }
          item.checked = false;
        })
        that.setData({
          myvideoList:myvideoList
        })
        console.log("视频收藏：", that.data.myvideoList);
      // }
    })
    console.log("视频收藏：", that.data.myvideoList);
  },
  //获取题目收藏数据
  getQueList() {
    let that = this,
      myqueList = this.data.myqueList;
    util.wxReq(api().myqueList.url, {}, "get", api().myqueList.hr).then(res => {
      myqueList = res.data.data
      wx.showLoading({
        title: '加载中',
      });
      if (res.data.code = '00000') {
        wx.hideLoading();
        myqueList.forEach((item, index) => {
          item.courseCategoryData.forEach((item1, index) => {
            item1.checked = false;
          })
        })
      }
      that.setData({
        myqueList
      })
      console.log("题目收藏：", that.data.myqueList);
    })
  },
  //选择单个视频或者单个题目
  singleselect(e) {
    console.log(e);
    let ismanage = this.data.ismanage,
      ismanage1 = this.data.ismanage1,
      id = e.currentTarget.dataset.id,
      myvideoList = this.data.myvideoList,
      myqueList = this.data.myqueList;
    if (ismanage == true || ismanage1 == true){
    myvideoList.forEach((item, index) => {
      console.log(item,id); //视频单个
      if (item.videoid == id) {
        item.checked = !(item.checked);
      }
    })
    myqueList.forEach((item, index) => { //题目单个
      item.courseCategoryData.forEach((item1, index) => {
        if (item1.id == id) {
          item1.checked = !(item1.checked);
        }
      })
    })
    this.setData({
      myvideoList,
      myqueList
    })
    }else{
     let  vname = e.currentTarget.dataset.vname;
     let  img = e.currentTarget.dataset.img;
      
      if (img) {
        app.globalData.course_img = img
      }
      wx.navigateTo({
        url: '/pages/video_details/video_details?vid=' + id + '&vname=' + vname
      })
    }
  },
  // 全选
  selectAll() {
    let myvideoList = this.data.myvideoList,
      myqueList = this.data.myqueList,
      selectAllStatus = !this.data.selectAllStatus;
    myvideoList.forEach((item, index) => { //视频单个
      if (selectAllStatus == true) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    })
    myqueList.forEach((item, index) => { //题目单个
      item.courseCategoryData.forEach((item1, index) => {
        if (selectAllStatus == true) {
          item1.checked = true;
        } else {
          item1.checked = false;
        }
      })
    })
    this.setData({
      selectAllStatus,
      myvideoList,
      myqueList
    })
  },

  delectLocalData(delType,idList){//本地数据删除
    if (delType=='video'){
      let myvideoList = this.data.myvideoList;
      for (let i of idList) {
        myvideoList.splice(myvideoList.findIndex(item => item.collectionid==i), 1);
      }
      return myvideoList;
    }
    
  },

  // 删除
  del() {
    let that = this,
      myvideoList = this.data.myvideoList,
      myqueList = this.data.myqueList,
      param = {
        str: []
      },
      param1 = {
        str: []
      };
    myvideoList.forEach((item, index) => { //视频单个
      if (item.checked == true) {
        param.str.push(item.collectionid);
      }
    })
    myqueList.forEach((item, index) => { //题目单个
      item.courseCategoryData.forEach((item1, index) => {
        if (item1.checked == true) {
          param1.str.push(item1.id);
        }
      })
    })
    param.str = param.str.join(','); //传给后台删除视频的id
    param1.str = param1.str.join(','); //传给后台删除题目的id
    console.log(param.str.length===0);
    if (param != ''){
      wx.showModal({
        title: '提示',
        content: '确定删除吗',
        success(res) {
          if (res.confirm) {
            util.wxReq(api().delvideocollect.url, param, "get", api().delvideocollect.hr).then(res => { //删除视频    
              
              that.setData({
                ismanage: false,
                ismanage1: false,
                myvideoList: that.delectLocalData('video', param.str.split(','))
              })
              // that.getList();

              wx.showToast({
                title: '删除成功',
                icon: 'none'
              })
            })
          } else if (res.cancel) {
            that.setData({
              ismanage: false,
              ismanage1: false,
              selectAllStatus:false
            })
          }
        }
      })
    } else if (param1 != ''){
      wx.showModal({
        title: '提示',
        content: '确定删除吗',
        success(res) {
          if (res.confirm) {
            util.wxReq(api().delquecollect.url, param1, "get", api().delquecollect.hr).then(res => { //删除题目
              that.setData({
                ismanage: false,
                ismanage1: false
              })
              // that.getQueList();
              wx.showToast({
                title: '删除成功',
                icon: 'none'
              })
            })
          } else if (res.cancel) {
            that.setData({
              ismanage: false,
              ismanage1: false,
              selectAllStatus: false
            })
          }
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