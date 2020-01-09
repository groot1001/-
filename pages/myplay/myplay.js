// pages/myplay/myplay.js
const util = require('../../utils/util.js'),
  api = require("../../api/myinfoApi.js");
  var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ismanage: false, //管理状态
    videolist: [],
    videolistTemp:[],
    param: {
      pageNo: 1,
      pageSize: 10
    },
    selectIndex: '',
    selectAllStatus: false //管理全选状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getList();
  },
  getList() {
    wx.showLoading({
      title: '加载中',
    });
    let param = this.data.param,
      that = this;
    that.data.param.pageNo = 1;
    util.wxReq(api().myplayList.url, param, "get", api().myplayList.hr).then(res => {
      console.log(res.data);
      let videolistTemp = res.data.data,
        videolist = this.data.videolist;
      if (res.data.code = '00000') {
        wx.hideLoading();
        if (res.data.data.length != 0) {
          for (var i = 0; i < videolistTemp.length; i++) {
            videolistTemp[i].checked = false;
          }
          videolist = videolistTemp
        } else {
          // wx.showToast({
          //   title: '没有更多数据了',
          //   icon: 'success',
          //   duration: 2000
          // })
        }
      }
      that.setData({
        videolist: videolist,
        videolistTemp: videolistTemp
      })
    })
  },
  // 分页数据
  nextPage() {
    this.data.param.pageNo++;
    util.wxReq(api().myplayList.url, param, "get", api().myplayList.hr).then(res => {
      console.log(res.data);
      let videolistTemp = res.data.data,
        videolist = this.data.videolist;
      if (res.data.code = '00000') {
        wx.hideLoading();
        if (res.data.data.length != 0) {
          for (var i = 0; i < videolistTemp.length; i++) {
            videolistTemp[i].checked = false;
          }
          videolist = this.data.videolist.concat(videolistTemp)
        } else {
          wx.showToast({
            title: '没有更多数据了',
            icon: 'success',
            duration: 2000
          })
        }
      }
      that.setData({
        videolist: videolist,
        videolistTemp: videolistTemp
      })
    })
    // this.getList();
    // if (this.data.videolistTemp.length == 0) {
    //   wx.showToast({
    //     title: '没有更多数据了',
    //     icon: 'success',
    //     duration: 2000
    //   })
    // }
  },
  // 编辑管理
  manage() {
   
    let ismanage = this.data.ismanage,
      videolist = this.data.videolist;
    if (videolist.length==0) {
     return false;
    }
    videolist.forEach((item, index) => {
      item.checked = false;
    })
    this.setData({
      ismanage: !ismanage,
      videolist
    })
    if (this.data.ismanage == false) {
      this.setData({
        selectAllStatus: false
      })
    }
  },
  // 选择单个
  singleselect(e) {
    console.log(e);
    if (this.data.ismanage==true){
    let id = e.currentTarget.dataset.id,
      videolist = this.data.videolist;
    videolist.forEach((item, index) => {
      if (item.id == id) {
        item.checked = !(item.checked);
        console.log(item.checked);
      }
    })
    this.setData({
      videolist
    })
    }else{
      let id = e.currentTarget.dataset.id;
      let coursType = e.currentTarget.dataset.courstype;
      let vname = e.currentTarget.dataset.vname;
      let img = e.currentTarget.dataset.img;
      if (img) {
        app.globalData.course_img = img
      }
      wx.navigateTo({
        url: '../video_details/video_details?vid=' + id + '&coursType=' + coursType + '&vname=' + vname
      })
    }
  },
  // 全选
  selectAll() {
    let videolist = this.data.videolist,
      selectAllStatus = !this.data.selectAllStatus;
    videolist.forEach((item, index) => {
      if (selectAllStatus == true) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    })
    this.setData({
      selectAllStatus,
      videolist
    })
  },
  delectLocalData(idList) {//本地数据删除
    
    let videolist = this.data.videolist;
      for (let i of idList) {
        videolist.splice(videolist.findIndex(item => item.id==i), 1);
        
      }
    return videolist;
  },
  // 删除
  deleteplay() {
    let that = this, 
     videolist = this.data.videolist,
      param = {
        str: []
      };
    videolist.forEach((item, index) => {
      if (item.checked == true) {
        param.str.push(item.id);
      }
    })
    param.str = param.str.join(',');
  
    console.log(param.str.split());
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success(res) {
        if (res.confirm) {
          let vidarr = param.str.split(',');
          that.dele_video_time(vidarr);
          // return false;
          util.wxReq(api().deleteplayRecode.url, param, "get", api().deleteplayRecode.hr).then(res => {
            console.log(res);
            // that.getList();
            that.setData({
              ismanage:false,
              videolist:that.delectLocalData(vidarr)
            })
          })
        } else if (res.cancel) {
          that.setData({
            ismanage: false,
            selectAllStatus:false
          })
        }
      }
    })
  },
  // 取消
  cancel() {
    let videolist = this.data.videolist;
    videolist.forEach((item, index) => {
      item.checked = false;
    })
    this.setData({
      videolist,
      ismanage: false,
      selectAllStatus: false
    })
  },
  //删除本地播放时间缓存
  dele_video_time(vidarr){
    try {
     
      for(let vid of vidarr) {
        console.log(vid)
        wx.removeStorageSync('_' + vid + '_video_time');
      }
     
    } catch (e) {
      // Do something when catch error
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