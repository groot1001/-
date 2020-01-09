// pages/questionbank_list/questionbank_list.js
const app = getApp(),
  util = require('../../utils/util.js'),
  cf = require("../../api/apiConfig.js"),
  api = require("../../api/questionApi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

    windowheight: 0,
    ejectbox_dispaly: false,
    questionbank_list: [],
    questionbank_name: "",
    onLoadpage: false,
    chapterind: 0
  },


  see_questionbank: function(s) { // 展开子项

    let qarr = this.data.questionbank_list,
      id = s.currentTarget.dataset.id,
      indexs = s.currentTarget.dataset.ind;
    console.log()
    qarr[indexs].permission = !qarr[indexs].permission;
    this.setData({
      questionbank_list: qarr
    })
    if (!qarr[indexs].questionbank_item) { //判断是第一次就查
      this.getMinChapter(id, indexs);
    }



  },


  ejectbox: function(e) {

    let qname = e.currentTarget.dataset.name,
      id = e.currentTarget.dataset.id,
      sates = e.currentTarget.dataset.sates || 0;


    this.data.questionbank_name = qname;
    this.data.qid = id;
    wx.navigateTo({
      url: '/pages/question/question?question_tit=' + qname + '&qid=' + id
    })
    // if (sates > 0) { //做过的
    //   this.setData({
    //     ejectbox_dispaly: !this.data.ejectbox_dispaly
    //   })
    // } else { //未做过的
    //   wx.navigateTo({
    //     url: '/pages/question/question?question_tit=' + qname + '&qid=' + id
    //   })
    // }

  },

  make_question: function(e) { //弹框内点击事件
    let exit = e.currentTarget.dataset.exit;
    if (exit == 2) {
      wx.navigateTo({
        url: '/pages/question/question?question_tit=' + this.data.questionbank_name + '&qid=' + this.data.qid
      })

    } else if (exit == 1) {
      //  跳转上传做题的缓存记录
      wx.navigateTo({
        url: '/pages/question/question?see_wt_question=' + 2 + '&qid=' + this.data.qid,
      })
    }
    this.setData({
      ejectbox_dispaly: !this.data.ejectbox_dispaly
    })
  },
  //获取题库章节
  getQuestionChapter(id) {
    wx.showLoading({
      title: '加载中！'
    })
    let self = this;
    let pame = {
      id,
    }
    util.wxReq(api().chapterList.url, pame, 'get', api().chapterList.hr).then(res => {
      if (res.data.code === '00000') {
        let chapterData = res.data.data;
        // console.log(chapterData)
        for (let c of chapterData) {
          c.permission = false;
        }
        self.setData({
          questionbank_list: chapterData
        })
        wx.hideLoading();
      }


    }).catch(err => {
      console.log(err)
    })
  },
  getMinChapter(id, indexs) { //获取小章节
    wx.showLoading({
      title: '加载中！'
    })
    let self = this;
    let pame = {
      id,
    }
    let questionbank_list = this.data.questionbank_list;
    util.wxReq(api().minChapterList.url, pame, 'get', api().minChapterList.hr).then(res => {
      if (res.data.code === '00000') {
        // console.log(res.data.data)
        questionbank_list[indexs].questionbank_item = res.data.data;
        self.setData({
          questionbank_list: questionbank_list
        })
        wx.hideLoading();
      }


    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    // console.log(options.id, '----------');
    this.getQuestionChapter(options.id);
    this.setData({
      windowheight: wx.getSystemInfoSync().windowHeight,
    })
    this.data.onLoadpage = true;
    this.data.maxClassId = options.id;
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
    // console.log(this.data.onLoadpag)
    if (!this.data.onLoadpage) {
      // console.log(this.data.maxClassId)
      this.getQuestionChapter(this.data.maxClassId);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.data.onLoadpage=false;
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