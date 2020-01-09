// pages/question/question.js
var stops;
//转换时间
const app = getApp(),
  util = require('../../utils/util.js'),
  cf = require("../../api/apiConfig.js"),
  api = require("../../api/questionApi.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    see_wt_err: 0, //查看错误解析显示解析
    question_num: 0,
    undone: 0,
    answer_card: false,
    patterm: "",
    childChapterId: '',
    this_current: 0,
    windowheight: 0,
    answer_parsing_dis: false,
    answer_parsing_index: 0,
    answer_time: 0,
    toppic_1: [],
    toppic_2: [],
    toppic_3: [],
    toppic_4: [],
    question: [],
    questionDataList:[],
    qtitle: '',
    questionErr: true,
    pageHeight: 102,
    // 拖拽参数
    writePosition: [80, 60], //默认定位参数
    writesize: [0, 0], // X Y 定位
    window: [0, 0], //屏幕尺寸
    write: [0, 0], //定位参数
    scrolltop: 0, //据顶部距离

  },
  //获取题目集合
  getQuestion(childChapterId) {
    // console.log('zx--')
    wx.showLoading({
      title: '加载中！'
    })
    let pame = {
      childChapterId
    }
    let self = this;
    util.wxReq(api().subjectList.url, pame, 'get', api().subjectList.hr).then(res => {
      if (res.data.code === '00000') {
        let questionData = res.data.data;
        let total = questionData.length;
        // console.log(res.data)
        // let obj={};
        //     for (let aitem of questionData[0].courseChooseValData){
        //       obj[aitem.id == '0' ? 'A' : aitem.id == '1' ? 'B' : aitem.id == '2' ? 'C' : aitem.id == '3' ? 'D' : 'E'] = aitem.name
        //     } fd
        //     console.log(obj)


        for (let q in questionData) {
          if (questionData[q].courseChooseType == 4) {

            if (questionData[q].courseRead) {
              questionData[q].courseRead = questionData[q].courseRead.replace(/\/Upload/g, 'https://www.xuelejia.com/Upload');
              questionData[q].courseRead = questionData[q].courseRead.replace(/\<img/g, '<img style="width:100%"');
            }
          }
          questionData[q].answer_parsing_dis = false;
          // questionData[q].number = Number(q)+1;
        }
        let initial=[];
        if (total>20){//大于20采用分段渲染（伪分页）
          initial= questionData.slice(0, 20);
          questionData.splice(0, 20);
        }else{
          initial = questionData
        }
      
        self.setData({
          total,
          question: initial,
          questionDataList: questionData,
          patterm: initial[0].courseChooseType == 1 ? "(单项选择题)" : initial[0].courseChooseType == 2 ? "(多项选择题)" : initial[0].courseChooseType == 3 ? "(判断题)" : "(不定项选择题)"
        })
        wx.hideLoading();
      }


    }).catch(err => {
      console.log(err)

    })
  },
  recordSubject(answerRst) { //旧版做题
    wx.showLoading({
      title: '正在交卷中！'
    })
    let userAnswer = [];
    let self = this;
    for (let a of answerRst) {
      userAnswer.push({
        courseId: a.id,
        userCourseAnswer: a.userCourseAnswer != null ? typeof(a.userCourseAnswer) == 'object' ? a.userCourseAnswer.join(',') : a.userCourseAnswer : -1,
        cateId: this.data.childChapterId
      })

    }
    util.wxReq(api().makeSubject.url, {
      userAnswer: JSON.stringify(userAnswer)
    }, 'POST', api().makeSubject.hr).then(res => {
      if (res.data.code === '00000') {
        // console.log(res.data);
        wx.setStorageSync('questionList', {
          question: answerRst,
          qtitle: self.data.qtitle
        });
        wx.hideLoading();
        wx.redirectTo({
          url: `/pages/submit_question/submit_question?childChapterId=${self.data.childChapterId}&answer_time=${self.data.answer_time}`
        })
      }
    }).catch(err => {
      console.log(err)
    })

  },
  // recordSubject: function (courseId, answerVal, that) { //新版做题                                                                         
  //   if (typeof (answerVal) =='object'){
  //     // console.log('-----------');
  //     answerVal = answerVal.join(',')
  //   }
  //   let pame = {
  //     courseId,
  //     answerVal,
  //     categoryId: this.data.childChapterId,
  //     courseType: 1,
  //     userTime: this.data.answer_time
  //   }

  //   util.wxReq(api().makeSubject.url, pame, 'get', api().makeSubject.hr).then(res => {
  //     if (res.data.code === '00000') {
  //       console.log(res.data);

  //     }
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // },


  //计算默认定位值
  getSysdata: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(e) {
        that.data.window = [e.windowWidth, e.windowHeight];
        var write = [];
        write[0] = that.data.window[0] * that.data.writePosition[0] / 100;
        write[1] = that.data.window[1] * that.data.writePosition[1] / 100;
        console.log(write, 45)
        that.setData({
          write: write
        }, function() {
          // 获取元素宽高
          wx.createSelectorQuery().select('.collectBox').boundingClientRect(function(res) {
            console.log(res.width)
            that.data.writesize = [res.width, res.height];
          }).exec();
        })
      },
      fail: function(e) {
        console.log(e)
      }
    });
  },
  //开始拖拽  
  touchmove: function(e) {
    var that = this;
    var position = [e.touches[0].pageX - that.data.writesize[0] / 2, e.touches[0].pageY - that.data.writesize[1] / 2 - this.data.scrolltop];
    that.setData({
      write: position
    });
  },
  onPageScroll(e) {
    this.data.scrolltop = e.scrollTop;
  },
  /**
   * 生命周期函数--监听页面加q
   */

  onLoad: function(options) {

    this.setData({
      windowheight: wx.getSystemInfoSync().windowHeight
    })
    this.getSysdata();
    this.data.childChapterId = options.qid;
    this.data.qtitle = options.question_tit || ""; //保存从目录传来的章节
    app.globalData.question.qid = options.qid;
    app.globalData.question.qtit = options.question_tit || '';
    if (options.question_tit) {
      wx.setNavigationBarTitle({
        title: options.question_tit || '', //设置从目录传来的章节
      })
    }
    // console.log(options.see_wt_question)
    if (options.see_wt_question) { //判断从是查看错题or做上传退出的题目
      let that = this;
      that.setData({
        see_wt_err: options.see_wt_question
      })
      // console.log('缓存')
      wx.getStorage({ //这里使用缓存模拟
        key: 'questionList',
        success: function(res) {
          // console.log(res);
        
          let wt_question = res.data.question;

          if (options.see_wt_question == 1) {
            wx.setNavigationBarTitle({
              title: '(错题解析)' + res.data.qtitle
            })
            // console.log('进来')
            wt_question = wt_question.filter(item => item.userCourseAnswer != null ? typeof(item.userCourseAnswer) == 'object' ? item.userCourseAnswer.join(',') != item.courseAnswer : item.userCourseAnswer != item.courseAnswer : item.userCourseAnswer == null)
          }else{
            wx.setNavigationBarTitle({
              title: '(全部解析)' + res.data.qtitle
            })
          }
          for (let q of wt_question) {
            q.answer_parsing_dis = true
          }
          let total = wt_question.length;
          let initial = [];
          if (total > 20) {//大于20采用分段渲染（伪分页）
            initial = wt_question.slice(0, 20);
            wt_question.splice(0, 20);
          } else {
            initial = wt_question
          }
          that.setData({
            // answer_parsing_dis: true,
            questionErr: false,
            pageHeight: 51,
            question: initial,
            total,
            questionDataList: wt_question,
            patterm: initial[0].courseChooseType == 1 ? "(单项选择题)" : initial[0].courseChooseType == 2 ? "(多项选择题)" : initial[0].courseChooseType == 3 ? "(判断题)" : "(不定项选择题)"
          })

        }
      })


    } else {
      let answer_time_nums = this.data.answer_time,
        that = this;
      this.getQuestion(options.qid);
      stops = setInterval(function() { //做题计时
        answer_time_nums++;
        that.setData({
          answer_time: util.time_utils(answer_time_nums) //转换
        })
      }, 1000)
    }


  },

  subsectionFn(){//分段渲染
    let intercept = [];
    let questionDataList = this.data.questionDataList;
    if (questionDataList.length != 0) {
      if (questionDataList.length > 20) {

        intercept = questionDataList.slice(0, 20);
        questionDataList.splice(0, 20);
      } else if (questionDataList.length < 20) {

        intercept = questionDataList.slice(0, questionDataList.length);
        questionDataList.splice(0, questionDataList.length);
      }
      this.setData({
        questionDataList,
        question: this.data.question.concat(intercept),
      })
    }
  },

  changeCurrent: function(c) { //滑动事件
    let question = this.data.question;
    if (c.detail.current + 1 == question.length-1) {
      this.subsectionFn();
    }
    let tys = this.data.question[c.detail.current].courseChooseType;
    this.setData({
      patterm: tys == 1 ? '(单项选择题)' : tys == 2 ? '(多项选择题)' : tys == 3 ? '(判断题)' :'(不定项选择题)',
      this_current: c.detail.current
    })

    // if (this.data.see_wt_err) {
    //   //查看错题时
    //   this.setData({
    //     answer_parsing_index: c.detail.current
    //   })
    // }
    // if (tys == 1) {
    //   this.setData({
    //     patterm: "(单项选择题)"
    //   })
    //   // let arr_1 = this.data.question.filter(x => x.courseChooseType == 1);

    // } else if (tys == 2) {
    //   this.setData({
    //     patterm: "(多项选择题)"
    //   })
    //   // let arr_2 = this.data.question.filter(x => x.courseChooseType == 2);

    // } else if (tys == 3) {
    //   this.setData({
    //     patterm: "(判断题)"
    //   })
    //   // let arr_3 = this.data.question.filter(x => x.courseChooseType == 3);

    // } else if (tys == 4) {
    //   this.setData({
    //     patterm: "(不定项选择题)"
    //   })
    //   // let arr_4 = this.data.question.filter(x => x.courseChooseType == 4);
    // }
  },
  //做题事件
  make_answers: function(m) {

    if (!this.data.questionErr) {
      return false;
    }

    let maxid = m.currentTarget.dataset.maxid,
      answer = m.currentTarget.dataset.answer,
      question = this.data.question,
      this_current = this.data.this_current,
      typ = m.currentTarget.dataset.typ;
    if (typ == 2 || typ == 4) {
      //多选题or多选
      let rest = false
      let tepArr = [];

      if (question[maxid].userCourseAnswer) {
        rest = question[maxid].userCourseAnswer.some((val, index, arr) => val === answer);
      }
      //数组里面有一个满足条件就为真
      if (rest) {
        //取消选择
        question[maxid].userCourseAnswer.splice(question[maxid].userCourseAnswer.findIndex(v => v == answer), 1);

      } else {
        //加入选择

        if (question[maxid].userCourseAnswer) {
          question[maxid].userCourseAnswer.push(answer);
        } else {
          tepArr.push(answer)
          question[maxid].userCourseAnswer = tepArr;

        }

        question[maxid].userCourseAnswer = question[maxid].userCourseAnswer.sort(function(a, b) {
          return a - b
        }) //数组排序
      }


    } else {
      //单选题及判断题
      question[maxid].userCourseAnswer = answer;
      // console.log('id-----', question[maxid].id)

      let that = this,
        cur = this_current + 1 < question.length ? this_current + 1 : question.length - 1 //每次做完题自动下一页，;
      let st = setTimeout(() => {
        that.setData({
          this_current: cur
        })
        clearTimeout(st);
      }, 100)
    }

    this.setData({
      question: question

    })
    if (question.length == this_current + 1) {
      wx.showToast({
        title: '做完啦~',
      })
    }

  },

  change_que: function(e) { //上下题
    let question = this.data.question;
    let changetype = e.currentTarget.dataset.changetype,
      thiscur = e.currentTarget.dataset.thiscur;
    if (changetype == "top") {
      this.setData({
        this_current: this.data.this_current - 1
      })
    } else if (changetype == "next") {
      this.setData({
        this_current: this.data.this_current + 1 < question.length ? this.data.this_current + 1 : question.length
      })
    }
  },
  //查看答案
  see_answer: function(e) {
    let question = this.data.question
    question[this.data.this_current].answer_parsing_dis = !question[this.data.this_current].answer_parsing_dis;
    console.log(!question[this.data.this_current].answer_parsing_dis)
    this.setData({
      // answer_parsing_dis: !this.data.answer_parsing_dis,
      question: question
      // answer_parsing_index: this.data.this_current
    })
  },
  //查看答题卡
  see_answer_card: function() {

    this.setData({
      answer_card: !this.data.answer_card
    }), wx.setNavigationBarTitle({
      title: '答题卡',
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: "#ffffff"
    })
    let tep_arr = this.data.question,
      undone = tep_arr.filter(x => x.userCourseAnswer == null).length, //未做数
      toppic_1 = tep_arr.filter(x => x.courseChooseType == 1),
      toppic_2 = tep_arr.filter(x => x.courseChooseType == 2),
      toppic_3 = tep_arr.filter(x => x.courseChooseType == 3),
      toppic_4 = tep_arr.filter(x => x.courseChooseType == 4);
    this.setData({
      undone: undone,
      toppic_1: toppic_1,
      toppic_2: toppic_2,
      toppic_3: toppic_3,
      toppic_4: toppic_4,
    })

  },
  //答题卡的点击题目跳转
  make_question_location: function(m) {
    let id = m.currentTarget.dataset.id,
      teparr = this.data.question;
    console.log(id);
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: "#fff"
    })
    for (let item in teparr) {

      if (teparr[item].id == id) {
        this.setData({
          this_current: Number(item),
          answer_card: !this.data.answer_card
        })
      }
    }
  },
  //继续做题
  continues: function() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: "#fff"
    })
    this.setData({
      answer_card: !this.data.answer_card
    })
  },
  //提交答题
  submit_question: function(s) {
    let tyb = s.currentTarget.dataset.tyb,
      tep_arr = this.data.question.concat(this.data.questionDataList),//合并为渲染的数据
      that = this;;

    // console.log(tep_arr);
    let undone = tep_arr.filter(t => t.userCourseAnswer == null); //检查有没做的题
    // console.log(undone);


    // let undone = (function() {
    //   let rst = [];
    //   for (let x of tep_arr) {//检查有没做的题
    //     if (!x.selected) {
    //       rst.push(false)
    //     }
    //   }
    //   return rst;
    // })();

    if (undone.length > 0) {
      wx.showModal({
        title: '提示',
        content: '您还有题目未作答，确认交卷吗？',
        success(res) {
          if (res.confirm) {
            that.recordSubject(tep_arr);


            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      // console.log("没有未做的")
      that.recordSubject(tep_arr);
      // wx.redirectTo({
      //   url: `/pages/submit_question/submit_question?childChapterId=${that.data.childChapterId}&answer_time=${this.data.answer_time}`
      // })
    }


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
    if (!wx.getStorageSync("token_key")) {

      wx.navigateTo({
        url: '/pages/author_login/author_login',
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(stops); //释放

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(stops); //释放
    // wx.setStorageSync('questionList', '');
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
    var that = this;

    return {
      title: that.data.qtitle,
      path: '/pages/question/question?qid=' + that.data.childChapterId + '&question_tit=' + that.data.qtitle


    }
  }
})