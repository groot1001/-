// pages/answer-det/answer-det.js
const util = require('../../utils/util.js'),
  api = require("../../api/answerApi.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    askid: '', //问题id
    detaillist: {}, //详情内容
    replydata: [], //回复列表
    likeNum: 0, //点赞
    collectNum: 0, //收藏
    make_zan_states: 0, //点赞状态
    make_collect_states: 0, //收藏状态
    make_Follow:0,//关注
    detailImg: [], //详情发表的图片
    content_val: '',//标题输入框值
    current: '',// 当前显示图片的http链接

    // 拖拽参数
    writePosition: [80, 60], //默认定位参数
    writesize: [0, 0],// X Y 定位
    window: [0, 0], //屏幕尺寸
    write: [0, 0], //定位参数
    scrolltop: 0,//据顶部距离
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

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function(options) {
    console.log(options.id);
    let mid = options.id;
    //获取当前日期时间
    this.setData({
      askid: mid,
      this_date: util.formatTime(new Date())
    });
    this.getList(options.id);
    this.getSysdata();
  },
  //点赞
  make_zan: function(e) {
    this.clicklike();
  },
  //收藏
  make_collect: function(e) {
    this.clickcollet();
  },
  //s输入框监听
  bindKeyInput: function(e) {
    let val = e.detail.value;
    this.setData({
      content_val: val
    })
  },
  //提交，发送
  submitcontent: function() {
    if (this.data.content_val.replace(/\s+/g, "").length != 0) {
      this.mycommend();
      this.setData({
        content_val: ""
      })
    } else {
      wx.showToast({
        title: '请输入内容~',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 获取问题详情数据
  getList(id) {
    let that = this;
    let param = {
      id: id
    };
    util.wxReq(api().askdetailList.url, param, "get", api().askdetailList.hr).then(res => {
      if (res.statusCode === 200) {
        console.log(res.data.data);
        let detaillist = res.data.data,
          detailimgtemp = res.data.data.images;
        if (detailimgtemp != null) {//判断详情图片是否为null
          if (detailimgtemp.indexOf(",") != -1) {//判断有多张图片时
            detailimgtemp = detailimgtemp.split(",");
          }else{//当为一张时，组成数组
            let arrytemp = [];
            detailimgtemp = arrytemp.concat(detailimgtemp);
            console.log(detailimgtemp);
          }
        }
        that.setData({
          detaillist,
          replydata: detaillist.replyData,
          likeNum: detaillist.likesNum,
          collectNum: detaillist.followNum,
          detailImg: detailimgtemp,
          make_Follow: detaillist.isFollow,
          make_zan_states:detaillist.isLikes
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '获取详情失败'
        })
      }
    })
  },
  // 预览图片
  previewImage: function (e) {
    console.log(e);
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.detailImg // 需要预览的图片http链接列表
    })
  },
  // 发表评论
  mycommend() {
    let that = this,
      mid = that.data.askid,
      mycontent = this.data.content_val;
    let param = {
      id: mid,
      content: mycontent
    };
    util.wxReq(api().sendreply.url, param, "get", api().sendreply.hr).then(res => {
      if (res.statusCode === 200) {
        console.log(res);
        that.getList(mid);
      } else {

      }
    })
  },
  // 点赞
  clicklike() {
    let that = this,
      mid = that.data.askid;
    let param = {
      bbsid: mid
    };
    util.wxReq(api().asklike.url, param, "get", api().asklike.hr).then(res => {
      console.log(res);
      if (res.statusCode === 200) {
        let islike = res.data.data.isFabulous,
          likeNum = that.data.likeNum;
        if (islike == 1) {
          likeNum = likeNum + 1;
        } else {
          likeNum = likeNum - 1;
        }
        console.log(res);
        that.setData({
          make_zan_states: islike,
          likeNum
        })
        console.log('dddddd', that.data.make_zan_states);
      } else {}
    })
  },
  // 关注
  clickcollet() {
    let that = this,
      mid = that.data.askid;
    let param = {
      bbsid: mid
    };
    util.wxReq(api().askconcern.url, param, "get", api().askconcern.hr).then(res => {
      if (res.statusCode === 200) {
        console.log(res.data.data.isFollow);
        // let iscollect = res.data.data.isCollection,
        //   collectNum = that.data.collectNum;
        // if (iscollect == 1) {
        //   collectNum = collectNum + 1;
        // } else {
        //   collectNum = collectNum - 1;
        // }
        // console.log(res);
        that.setData({
          make_Follow: res.data.data.isFollow,
          // collectNum
        })
      } else { }
    })
  },
  // 收藏
  // clickcollet() {
  //   let that = this,
  //     mid = that.data.askid;
  //   let param = {
  //     topicid: mid
  //   };
  //   util.wxReq(api().askcollect.url, param, "get", api().askcollect.hr).then(res => {
  //     if (res.statusCode === 200) {
  //       let iscollect = res.data.data.isCollection,
  //         collectNum = that.data.collectNum;
  //       if (iscollect == 1) {
  //         collectNum = collectNum + 1;
  //       } else {
  //         collectNum = collectNum - 1;
  //       }
  //       console.log(res);
  //       that.setData({
  //         make_collect_states: iscollect,
  //         collectNum
  //       })
  //       console.log('make_collect_states', that.data.make_collect_states);
  //     } else {}
  //   })
  // },
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
        url: `/pages/author_login/author_login`
      })
      return false;
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

    wx.showToast({
      title: '没有更多啦',
      icon: 'none'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this;
    return {
      title: that.data.tit,
      path: '/pages/answer-det/answer-det?id=' + askid
    }
  }
})