//index.js
const app = getApp(),
  util = require('../../utils/util.js'),
  cf = require("../../api/apiConfig.js"),
  api = require("../../api/indexApi.js");
let img_id = [];
Page({
  data: {
    media_www: cf._www,
    banners: [],
    recommend_course: [],
    current_index: 0,
    teacher_data: [],
    news_preferen: [],
    newanswerList: [],
    videoType: 0,
    // 拖拽参数
    writePosition: [80, 70], //默认定位参数
    writesize: [0, 0],// X Y 定位
    window: [0, 0], //屏幕尺寸
    write: [0, 0], //定位参数
    scrolltop: 0,//据顶部距离
    img_id: [],
    platform: ''
  },

  onLoad: function() {

    wx.showLoading({
      title: '努力加载中！',
    })
    this.getCarousel();
    let platform = wx.getSystemInfoSync().platform;
    this.setData({ platform})

    this.getTeacher();
    this.getNewsPreferen();
    this.getnewanswerList();
    wx.setNavigationBarTitle({
      title: '课程'
    })

    this.getSysdata();
  },
  //计算默认定位值
  getSysdata: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (e) {
        that.data.window = [e.windowWidth, e.windowHeight];
        var write = [];
        write[0] = that.data.window[0] * that.data.writePosition[0] / 100;
        write[1] = that.data.window[1] * that.data.writePosition[1] / 100;
        console.log(write, 45)
        that.setData({
          write: write
        }, function () {
          // 获取元素宽高
          wx.createSelectorQuery().select('.collectBox').boundingClientRect(function (res) {
            console.log(res.width)
            that.data.writesize = [res.width, res.height];
          }).exec();
        })
      },
      fail: function (e) {
        console.log(e)
      }
    });
  },
  //开始拖拽  
  touchmove: function (e) {
    var that = this;
    var position = [e.touches[0].pageX - that.data.writesize[0] / 2, e.touches[0].pageY - that.data.writesize[1] / 2 - this.data.scrolltop];
    that.setData({
      write: position
    });
  },
  onPageScroll(e) {
    this.data.scrolltop = e.scrollTop;
  },
  //轮播
  getCarousel: function() {
    let self = this;
    util.wxReq(api().carousel.url,'','get', api().carousel.hr).then(res => {
      if (res.data.code === '00000') {
        let bannerArr = res.data.data
        self.setData({
          banners: bannerArr
        })

      }


    }).catch(err => {
      console.log(err)
    })
  },
  //举荐课程
  getRecomCurriculum: function() {
    let self = this;

    util.wxReq(api().recomCurriculum.url, "", 'get', api().recomCurriculum.hr).then(res => {

      if (res.data.code === '00000') {
        let rc_data = res.data.data
        self.setData({
          recommend_course: rc_data,
          videoType: rc_data[0].vtype
        })
        wx.hideLoading();
      }


    }).catch(err => {
      console.log(err)
    })
  },

  //在线专家
  getTeacher: function() {
    let self = this;
    util.wxReq(api().teacherList.url, 'get', api().teacherList.hr).then(res => {
      //  console.log(res.data.data)
      if (res.data.code === '00000') {
        let rc_data = res.data.data;
        let rstArr = [];
        for (let t = 0, len = rc_data.length; t < len; t += 3) {
          rstArr.push(rc_data.slice(t, t + 3))
          // console.log(t,t+3)
        }
        // console.log(rstArr);
        self.setData({
          teacher_data: rstArr
        })
        // wx.hideLoading();
      }


    }).catch(err => {
      console.log(err)
    })
  },

  //最新政策
  getNewsPreferen: function() {
    let self = this;
    util.wxReq(api().getNewsPreferen.url, 'get', api().getNewsPreferen.hr).then(res => {
      if (res.data.code === '00000') {
        let preferen = res.data.data;

        self.setData({
          news_preferen: self.setRandomArrayElements(preferen, 3) //随机抽取3个取
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  //img_err
  course_img_err: function(e) {

    img_id.push(e.currentTarget.id);
 
    this.setData({
      img_id
    })
  },

  //数组随机抽取
  setRandomArrayElements: function(arr, count = 3) {
    if (arr.length > 3) {
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp, index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      var randomArr = shuffled.slice(min);

    } else {
      randomArr = arr
    }

    return randomArr;
  },
  // 跳转政策详情
  topolicydetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../newpolicydetail/newpolicydetail?id=' + id
    })
  },
  //跳转视频详情
  toSeeVideo(e) {
    let vid = e.currentTarget.dataset.vid,
      vname = e.currentTarget.dataset.vname;
    if (wx.getStorageSync("token_key")) {
      let img = e.currentTarget.dataset.img;
      if (img){
        app.globalData.course_img = img
      }
     
      wx.navigateTo({
        url: `/pages/video_details/video_details?vid=${vid}&vname=${vname}`
      })
    } else {
      wx.navigateTo({
        url: '/pages/author_login/author_login',
      })
    }

  },
  // 跳转更多政策列表页面
  topolicy() {
    wx.navigateTo({
      url: '../newpolicy/newpolicy'
    })
  },
  // 请求推荐答疑板块数据
  getnewanswerList() {
    let that = this;
    util.wxReq(api().getnewanswer.url, {}, "get", api().getnewanswer.hr).then(res => {
      if (res.statusCode == 200) {
        let newanswerList = res.data.data;

        for (let n of newanswerList) {
          if (n.photo != null) {
            if (!n.photo.startsWith("http")) {
              n.photo = cf._www + n.photo
            }
          }

        }
        that.setData({
          newanswerList: newanswerList
        })
      }
    })
  },
  // 答疑详情跳转
  todatail(e) {
    console.log(e.currentTarget.dataset.id);
    if (wx.getStorageSync("token_key")) {
      wx.navigateTo({
        url: '/pages/answer-det/answer-det?id=' + e.currentTarget.dataset.id
      })
    } else {
      wx.navigateTo({
        url: '/pages/author_login/author_login',
      })
    }

  },
  // 发表问题
  publish() {
    if (wx.getStorageSync("token_key")) {
      wx.navigateTo({
        url: '../sendarea/sendarea'
      })
    } else {
      wx.navigateTo({
        url: '/pages/author_login/author_login',
      })
    }

  },
  //选择课程分类
  sele_class: function(e) {
    // console.log(e.currentTarget.dataset.vtype)
    this.setData({
      current_index: e.currentTarget.dataset.cind,
      videoType: e.currentTarget.dataset.vtype
    })
  },
  //轮播滑动
  bindchange: function(e) {
    let current = e.detail.current;
    this.setData({
      current_index: current,
      videoType: this.data.recommend_course[current].vtype
    })
  },
  see_acction: function() {
    wx.navigateTo({
      url: '/pages/acction/acction',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // onPullDownRefresh: function () {
  //   this.getCarousel();
  //   "enablePullDownRefresh": true,
  //   this.getRecomCurriculum();
  //   this.getTeacher();
  //   this.getNewsPreferen();
  //   this.getnewanswerList();
  // },
  onReachBottom: function() {

    // wx.showToast({
    //   title: '没有更多啦',
    //   icon: 'none'
    // })
  },
  onShow: function() {
    this.getRecomCurriculum();
  },
  onShareAppMessage: function() {
    return {
      title: '学乐佳会计',
      path: '/pages/index/index',

    }
  }

})