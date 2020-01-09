// pages/submit_question/submit_question.js
const app = getApp(),
  util = require('../../utils/util.js'),
  cf = require("../../api/apiConfig.js"),
  api = require("../../api/questionApi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sq_time: "",
    total_score: 0.0,
    correct_rate: 0,
    sum_total_score: 0.0,
    title: "",
    toppic_1: [],
    toppic_2: [],
    toppic_3: [],
    toppic_4: [],
    childChapterId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getMakeSubjectRst(childChapterId) {
    wx.showLoading({
      title: '正在获取结果！'
    })
    let pame = {
      qid: childChapterId
    }
    let self = this;
    util.wxReq(api().answerReport.url, pame, 'get', api().answerReport.hr).then(res => {
      if (res.data.code === '00000') {
        console.log(res.data);
        let {
          courserate,
          coursetotal,
          onlydata,
          doubledata,
          judgedata,
          readdata,
          useranswergrade
        } = res.data.data;
        self.setData({
          correct_rate: courserate, //正确率
          total_score: useranswergrade, //得分
          sum_total_score: coursetotal,
          toppic_1: onlydata,
          toppic_2: doubledata,
          toppic_3: judgedata,
          toppic_4: readdata,
        })
        wx.hideLoading();
      }
    }).catch(err => {
      console.log(err)
    })
  },

  onLoad: function(options) {
    
    let that = this;
    that.setData({
      windowheight: wx.getSystemInfoSync().windowHeight,
      sq_time: options.answer_time,
      childChapterId: options.childChapterId
    })
    that.getMakeSubjectRst(options.childChapterId)
    // wx.getStorage({ //获取缓存数据模拟
    //   key: 'question',
    //   success: function(res) {
    //     console.log("------------", res.data.question);
    //     wx.setNavigationBarTitle({
    //       title: `答题报告${res.data.title}`
    //     })
    //     let tep_arr = res.data.question,
    //       // 分出题型
    //       arr_1 = tep_arr.filter(x => x.types == 1),
    //       arr_2 = tep_arr.filter(x => x.types == 2),
    //       arr_3 = tep_arr.filter(x => x.types == 3),
    //       //分出做对的
    //       arr_1_score = arr_1.filter(a => a.selected === a.answer_parsing.answeres),
    //       arr_2_score = arr_2.filter(a => a.selected.join(",") === a.answer_parsing.answeres),
    //       arr_3_score = arr_3.filter(a => a.selected === a.answer_parsing.answeres),
    //       total_score = 0,//统计分数
    //       sum_total_score = 0,
    //       correct_rate = 0,
    //       a_1_len = arr_1_score.length,
    //       a_2_len = arr_2_score.length,
    //       a_3_len = arr_3_score.length;

    //     // 判断单选题不能为空
    //     if (a_1_len > 0) {
    //       total_score += arr_1_score.length * arr_1_score[0].grade
    //     } else {
    //       total_score += 0
    //     }

    //     // 判断多选题不能为空
    //     if (a_2_len > 0) {
    //       total_score += arr_2_score.length * arr_2_score[0].grade
    //     } else {
    //       total_score += 0;

    //     }
    //     // 判断判断题不能为空
    //     if (a_3_len > 0) {
    //       total_score += arr_3_score.length * arr_3_score[0].grade
    //     } else {
    //       total_score += 0
    //     }
    //     // 计算全部题总分
    //     for (let t of tep_arr) {
    //       sum_total_score += t.grade
    //     }
    //     //计算正确率
    //     correct_rate = (a_1_len + a_2_len + a_3_len) / tep_arr.length * 100;

    //     that.setData({
    //       sq_time: res.data.time,
    //       toppic_1: arr_1,
    //       toppic_2: arr_2,
    //       toppic_3: arr_3,
    //       total_score: total_score,
    //       sum_total_score: sum_total_score,
    //       correct_rate: correct_rate,
    //       title: res.data.title
    //     })
    //   },
    // })

  },
  //查看解析
  to_parse: function(t) {
    let tys = t.currentTarget.dataset.tys,
      that = this;

    wx.showModal({
      title: '提示',
      content: '确定前去查看错误解析吗？',
      success(res) {
        if (res.confirm) {
          if (tys == 'all') {
            wx.redirectTo({
              url: '/pages/question/question?see_wt_question=' + 2 + '&qid=' + that.data.childChapterId,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          } else if (tys == 'err') {
            wx.redirectTo({
              url: '/pages/question/question?see_wt_question=' + 1 + '&qid=' + that.data.childChapterId,
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          }

          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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