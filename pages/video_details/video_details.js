// pages/video_details/video_details.js

//转换时间
const util = require('../../utils/util.js'),
  md5 = require("../../utils/md5.js"),
  cf = require("../../api/apiConfig.js");

let api = require("../../api/videoCourseApi.js");
var app = getApp();
import polyv from '../../utils/polyv.js';
import {
  throttle,
  debounce
} from '../../utils/tool.js';
Page({

  /**http://220.112.193.197/mp4files/A18400000009E79A/vjs.zencdn.net/v/oceans.mp4

http://vjs.zencdn.net/v/oceans.mp4


   * 页面的初始数据
   */
  data: {
    cid: -1, //课程id,
    coursType: 1,
    // chapterOpen: true,
    onloads: false,
    maxChapterIndex: 0,
    videoSrc: '',
    minChapterIndex: 0,
    videoCatalogList: [], //视频目录列表
    commentList: [],
    autoplay: false,
    commentParame: {
      videoId: '',
      pageNo: 1,
      pageSize: 10
    },
    // pageHeight: 0,
    scrollHeight: 0,
    equipment: true,
    commentBottom: false,
    couseDetails: {}, //课程详情
    cate_dis: false,
    handout: null,
    posVlan: 'position_s', //切换栏定位
    scorllTopVla: 184,
    initial_time: "", //缓存的播放时间
    plays_video: false,
    cate_block: false,
    imgurl_www: cf._www, //链接拼接
    video_index: 0, //判别是否播放中改版前
    this_paly_time: 0,
    video_tab: 0,
    rateVal: 1,
    network_supervise: true,
    is_Buy: true,
    ctitle: '',
    courseStatus: 2,
    platform:''
  },

  click_cate: function() { //显示倍速
    this.setData({
      cate_block: !this.data.cate_block
    })

  },

  rateFn: function(e) { //倍速控制
    let rate = e.currentTarget.dataset.rate;
    this.videoContext.playbackRate(Number(rate));
    this.setData({
      rateVal: Number(rate),
      cate_block: !this.data.cate_block
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(wx.getStorageSync("token_key"),'token----------------')
    wx.setNavigationBarTitle({
      title: options.vname,
    })

    // this.videoContext.playbackRate(2)
    // console.log(wx.getSystemInfoSync().model)
    wx: wx.showLoading({
      title: '加载中~',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    let phoneModel = wx.getSystemInfoSync().model,
      pageHeight = wx.getSystemInfoSync().windowHeight;

    let plus6 = /^iPhone 6 Plus/;
    let plus7 = /^iPhone 7 Plus/;
    let plus8 = /^iPhone 8 Plus/;
    let plusX = /^iPhone X/;
    let plusXR = /^iPhone XR/;
    let plusXS = /^iPhone XS/;
    let platform = wx.getSystemInfoSync().platform;
    this.data.platform = platform;
    let scrollHeight = phoneModel.match(plusX) == 'iPhone X' ? pageHeight * 0.642 : phoneModel.match(plusXR) == 'iPhone XR' ? pageHeight * 0.643 : phoneModel.match(plusXS) == 'iPhone XS' ? pageHeight * 0.643 : pageHeight * 0.56;

    this.setData({
      scrollHeight,
      ctitle: options.vname,
      cid: options.vid,
      onloads: true,
      coursType: options.coursType || 1,
      equipment: phoneModel.match(plus7) == 'iPhone 7 Plus' ? true : phoneModel.match(plus6) == 'iPhone 6 Plus' ? true : phoneModel.match(plus8) == 'iPhone 8 Plus' ? true : false,

      scorllTopVla: phoneModel.match(plus7) == 'iPhone 7 Plus' ? 200 : phoneModel.match(plus6) == 'iPhone 6 Plus' ? 200 : phoneModel.match(plus8) == 'iPhone 8 Plus' ? 200 : 184
    })

    // console.log(options.coursType || 1, '-----------------');
    let param = {
      id: options.vid,
      type: this.data.coursType //课程类型（1课程，3报班）
    }
    let self = this;
    util.wxReq(api().curiculumInfo.url, param, 'get', api().curiculumInfo.hr).then(res => { //课程信息
      // console.log(res.data.data);

      self.setData({
        couseinfoData: res.data.data
      })
    }).catch(err => {
      console.log(err)

    })

  },

  getCouseDetails: function() { //获取课程详情
    let param = {
      id: this.data.cid,
      type: this.data.coursType //课程类型（1课程，3报班）
    }
    let self = this;
    util.wxReq(api().curriculumDetails.url, param, 'get', api().curriculumDetails.hr).then(res => { //课程信息

      self.setData({
        couseDetails: res.data.data
      })
    }).catch(err => {
      console.log(err)
    })
  },
  getComment: function() { //获取评论列表
    wx.showLoading({
      title: '正在加载~',
    })
    let self = this;
    util.wxReq(api().curriculumQuestion.url, self.data.commentParame, 'get', api().curriculumQuestion.hr).then(res => {
      // console.log(res.data.data.length);
      if (res.data.data.length > 0) {
        self.setData({
          commentList: self.data.commentList.concat(res.data.data)
        })
      } else if (res.data.data.length == 0) {
        // console.log(self.data.commentBottom, '--------------------')
        self.setData({
          commentBottom: false
        })
        wx.showToast({
          title: '暂无数据~',
          icon: 'none',
          duration: 2000
        })
      }
      wx.hideLoading();
    }).catch(err => {
      console.log(err)
    })
  },
  getHandout: function() { //获取课程讲义
    wx.showLoading({
      title: '加载中~',
    })
    let param = {
      videoId: this.data.videoCatalogList[this.data.maxChapterIndex].currVideoData[this.data.minChapterIndex].videoId,
      type: this.data.coursType //课程类型（1课程，3报班）
    }
    // console.log(param, '-------------')
    let self = this;
    util.wxReq(api().curriculumHandout.url, param, 'get', api().curriculumHandout.hr).then(res => {
      let url = res.data.data.url;
      if (url.indexOf("https") < 0) {
        url = url.replace("http:", "https:");

      }
      console.log(url)
      wx.request({
        url: url,
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(rs) {
          let REG_BODY = /<body[^>]*>([\s\S]*)<\/body>/; //正则body标签内容
          self.setData({
            handout: REG_BODY.exec(rs.data)[1]
          })
        },
        fail: function(res) {},
        complete: function(res) {
          wx.hideLoading();
        },
      })
    }).catch(err => {
      console.log(err);
    })
  },
  getCurriculumCatalog: function() { //获取课程目录。视频列表
    let param = {
      id: this.data.cid,
      type: this.data.coursType //课程类型（1课程，3报班）
    }
    let maxInd = this.data.maxChapterIndex,
      commentParame = this.data.commentParame,
      minInd = this.data.minChapterIndex;
    let self = this;
    util.wxReq(api().curriculumCatalog.url, param, 'get', api().curriculumCatalog.hr).then(res => {

      if (res.data.data.length != 0) {
        let vlist = res.data.data;
        for (let f in vlist) {//设定默认展开
          if (f == 0) {
            vlist[f].chapterOpen = true;
          } else {
            vlist[f].chapterOpen = false;
          }
        }

        if (res.data.data[0].currVideoData.length != 0) {//初始化第一个视频
          commentParame.videoId = vlist[0].currVideoData[0].videoId;
        }
        //刷选视频购买状态
        let pidArr = [];
        for (let v of vlist) {
          for (let c of v.currVideoData) {
            pidArr.push(c.isBuy)
          }
        }
        let onBuy = pidArr.some(item => item == 0);
        let free = pidArr.every(item => item == 2);
        let isOkBuy = pidArr.every(item => item == 1);
        // let chapterIsOkBuy = pidArr.every(item => item == 1);
        let platform = this.data.platform;
        if (onBuy) { //购买状态

          if (platform == 'android') { //等于安卓显示购买
            this.setData({
              courseStatus: 0
            })
          } else {
            this.setData({
              courseStatus: 2
            })
          }
        } else if (free) {
          this.setData({
            courseStatus: 2
          })
        } else if (isOkBuy) {
          if (platform == 'android') {
            this.setData({
              courseStatus: 1
            })
          } else {
            this.setData({
              courseStatus: 4
            })
          }

        }
        if (res.data.data[0].currVideoData.length != 0) {
          self.getVidepUrl(vlist[0].currVideoData[0].playerId); //初始化视频

        } else {
          self.getVidepUrl();
          this.setData({
            courseStatus: 3
          })
        }


        self.setData({
          videoCatalogList: vlist,
          commentParame: commentParame
        })
      }
      self.getCacheRecord(); //获取缓存记录
      wx.hideLoading();

    }).catch(err => {
      console.log(err)
    })
  },

  getVidepUrl: function(pid = null) { //获取视频地址
    let that = this;
    if (pid == null || pid == '') {
      that.setData({
        is_Buy: false
      })
      let platform = this.data.platform;
      if (platform == 'android') {
        wx.showModal({
          title: '温馨提示!',
          content: '该课程未购买,请前往咨询购买！',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.bottom_btn()
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }


      return false;
    }

    let ts = new Date(new Date()).getTime();

    let sign = md5.hexMD5('h0V6ySCABl' + pid + ts)

    let obj = {
      vid: pid,
      ts,
      sign,
      callback: videoInfo => {
        if (videoInfo.type === 'error') {
          console.log('videoInfo', videoInfo);
          return;
        }
        console.log(videoInfo)
        that.setData({
          videoSrc: videoInfo.src[0],
        });
      }
    };
    that.player = polyv.getVideo(obj);
  },

  screenChange(e) {
    let fullScreen = e.detail.fullScreen //值true为进入全屏，false为退出全屏
    if (!fullScreen) { //退出全屏
      this.setData({
        cate_dis: false
      })
    } else { //进入全屏
      this.setData({
        cate_dis: true
      })
    }
  },
  // bindwaiting(e) {
  //   console.log(e, '---------------------')
  // },
  bindplay: function(e) {


    wx.hideLoading();
    let that = this;
    if (this.data.network_supervise) {
      wx.getNetworkType({
        success(res) {
          const networkType = res.networkType
          console.log(networkType);
          if (networkType != 'wifi') {
            that.videoContext.pause();
            wx.showModal({
              title: '温馨提示！',
              content: '您的网络不是wifi环境，是否继续',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  that.setData({
                    network_supervise: false
                  })

                  that.videoContext.play();
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      })
    }
  },
  bindtimeupdate: function(e) {

    try {

      let this_paly_time = Math.round(e.detail.currentTime),
        duration_time = Math.round(e.detail.duration);
      if (this_paly_time == duration_time - 30) { //监听播放结束前30秒
        let maxChapterIndex = this.data.maxChapterIndex,
          minChapterIndex = this.data.minChapterIndex,
          commentParame = this.data.commentParame,
          videoCatalogList = this.data.videoCatalogList;
        minChapterIndex = Number(minChapterIndex) + 1; //播放完子章节+1
        console.log(minChapterIndex, '-----------------', videoCatalogList[maxChapterIndex].currVideoData.length - 1)
        if (minChapterIndex == videoCatalogList[maxChapterIndex].currVideoData.length) { //如果子章节等于最后一个
          console.log('第一个判断')
          if (maxChapterIndex < videoCatalogList.length) { //如果大章节没有等于最后一个，就大章节继续加，子章节便清0

            maxChapterIndex = Number(maxChapterIndex) + 1;
            minChapterIndex = 0;
            console.log('第2个判断', minChapterIndex)
          }
        }
        console.log(maxChapterIndex, ':', minChapterIndex)
        if (videoCatalogList[maxChapterIndex].currVideoData[minChapterIndex].isBuy != 0) { //判断下一个视频是否解锁

          wx.showToast({
            title: `即将为您播放《${videoCatalogList[maxChapterIndex].currVideoData[minChapterIndex].currCategoryName}》`,
            icon: 'none',
            duration: 2000
          })
        }

      }

      this.setData({
        this_paly_time: this_paly_time
      }) //保存当前视频播放的时间


    } catch (e) {
      // Do something when catch error
      console.log(e);
    }

  },
  //监听视频播放结束，播放可播放的视频
  bindended: function(e) {
    try {
      if (e.type === "ended") {
        let maxChapterIndex = this.data.maxChapterIndex,
          minChapterIndex = this.data.minChapterIndex,
          commentParame = this.data.commentParame,
          videoCatalogList = this.data.videoCatalogList;
        minChapterIndex = Number(minChapterIndex) + 1; //播放完子章节+1
        if (minChapterIndex == videoCatalogList[maxChapterIndex].currVideoData.length) { //如果子章节等于最后一个

          if (maxChapterIndex < videoCatalogList.length) { //如果大章节没有等于最后一个，就大章节继续加，子章节便清0
            maxChapterIndex = Number(maxChapterIndex) + 1;
            minChapterIndex = 0;
          }
        }

        if (videoCatalogList[maxChapterIndex].currVideoData[minChapterIndex].isBuy != 0) { //判断下一个视频是否解锁
          commentParame.videoId = videoCatalogList[maxChapterIndex].currVideoData[minChapterIndex].videoId;
          commentParame.pageNo = 1;
          let pid = videoCatalogList[maxChapterIndex].currVideoData[minChapterIndex].playerId
          this.setData({
            maxChapterIndex: maxChapterIndex,
            minChapterIndex: minChapterIndex,
            commentParame: commentParame,
            commentList: [], //切换时清空视频评论
            this_paly_time: 0
          })
          let that = this;
          this.getVidepUrl(pid);
        } else {
          let platform = this.data.platform;
          if (platform == 'android') {
          wx.showModal({
            title: '提示',
            content: '抱歉，该视频未解锁，请咨询购买',
            confirmText: '购买',
            success(res) {
              if (res.confirm) {
                that.bottom_btn()
              } else if (res.cancel) {

              }
            }
          })
          }else{
            wx.showToast({
              title: '暂无服务',
              icon:'none'
            })
          }
        }


      }
    } catch (e) {
      // Do something when catch error
      console.log(e);
    }
  },
  // 切换，点播视频
  plays_videoFn: function(e) {
    let click_type = e.currentTarget.dataset.onclicktype,
      video_url = this.data.video_url;
    // if (click_type === "img") { //点击封面图
    //   if (video_url[0].type_play == true) { //判断第一个视频是否解锁
    //     this.setData({
    //       plays_video: true,
    //       video_index: this.data.video_index == -1 ? 0 : this.data.video_index //如果有观看记录就播放之前的，反之从第一个开始
    //     })
    //   } else {
    //     wx.showModal({
    //       title: '提示',
    //       content: '抱歉，该视频未解锁，请咨询购买',
    //       confirmText: '购买',
    //       success(res) {
    //         if (res.confirm) {

    //         } else if (res.cancel) {

    //         }
    //       }
    //     })
    //   }

    // } else if (click_type === "chapter") { //点击章节播放
    let maxInd = e.currentTarget.dataset.maxind,
      minInd = e.currentTarget.dataset.minind,
      pid = e.currentTarget.dataset.pid,
      playstate = e.currentTarget.dataset.playstate;
    wx.createVideoContext('couseVideo').stop();
    if (this.data.maxChapterIndex == maxInd) {
      if (this.data.minChapterIndex == minInd) {
        // console.log('正在播放~')
        return false;
      }
    }
    if (playstate != 0) { //判断该视频是否解锁
      let commentParame = this.data.commentParame,
        videoCatalogList = this.data.videoCatalogList;
      commentParame.videoId = videoCatalogList[maxInd].currVideoData[minInd].videoId;
      commentParame.pageNo = 1;
      this.setData({
        maxChapterIndex: maxInd,
        minChapterIndex: minInd,
        commentParame: commentParame,
        commentList: [], //切换时清空视频评论
        this_paly_time: 0,
        initial_time: 0
      })

      this.getVidepUrl(pid);
    } else {

      let that = this;
      let platform = this.data.platform;
      if (platform == 'android') {
      wx.showModal({
        title: '提示',
        content: '抱歉，该视频未解锁，请咨询购买',
        confirmText: '购买',
        success(res) {
          if (res.confirm) {
            that.bottom_btn()
          } else if (res.cancel) {

          }
        }
      })
      }else{
        wx.showToast({
          title: '暂无服务',
          icon: 'none'
        })
      }
    }

    // }

  },
  // 切换课程，简介
  video_tab: function(e) {
    let val = e.currentTarget.dataset.val;


    if (val == 1) { //点击详情
      if (Object.keys(this.data.couseDetails.length == 0)) {
        this.getCouseDetails();
      }
    } else if (val == 2) { //点击讲义
      if (this.data.video_tab != 2) {
        this.getHandout();
      }
    } else if (val == 3) { //点击评价
      if (this.data.video_tab != 3) {
        this.getComment();

      }

    }
    this.setData({
      video_tab: val,
      // posVlan: 'position_s'
    })
  },
  chapterOpenFn: function(e) { //目录展开收起
    let videoCatalogList = this.data.videoCatalogList;
    let maxChapterIndex = e.currentTarget.dataset.maxind;
    videoCatalogList[maxChapterIndex].chapterOpen = !videoCatalogList[maxChapterIndex].chapterOpen;
    this.setData({
      // maxChapterIndex: maxChapterIndex,
      videoCatalogList
      // chapterOpen: !this.data.chapterOpen
    })
  },
  //收藏and取消
  collectionFn: function() {

    let self = this,
      param = {
        topicid: self.data.cid
      },
      couseinfoData = self.data.couseinfoData;
    util.wxReq(api().videoCollection.url, param, 'get', api().videoCollection.hr).then(res => {
      console.log(res)
      couseinfoData.isCollection = res.data.data.CollectType
      self.setData({
        couseinfoData
      })

    }).catch(err => {
      console.log(err)
    })
  },
  //教师的关注与取消关注
  teacherFollow: function() {
    let self = this,
      couseDetails = self.data.couseDetails,
      param = {
        teacherId: couseDetails.teacherId
      };

    util.wxReq(api().teacherLike.url, param, 'get', api().teacherLike.hr).then(res => {

      couseDetails.isFollow = res.data.data.isLike
      self.setData({
        couseDetails
      })

    }).catch(err => {
      console.log(err)
    })
  },
  //视频评论的点赞与取消
  make_like: function(e) {

    let self = this,
      commentList = self.data.commentList,
      videoId = self.data.commentParame.videoId,
      topicid = e.currentTarget.dataset.topicid,
      index = e.currentTarget.dataset.index,
      param = {
        videoId: videoId,
        topicId: topicid
      };
    util.wxReq(api().videoLike.url, param, 'get', api().videoLike.hr).then(res => {
      if (res.data.data.isLike == 0) {
        commentList[index].likeNum = commentList[index].likeNum - 1
      } else {
        commentList[index].likeNum = commentList[index].likeNum + 1
      }
      commentList[index].isLike = res.data.data.isLike;
      self.setData({
        commentList
      })
      console.log(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  },


  to_comment: function() { //去评论
    let maxChapterIndex = this.data.maxChapterIndex,
      minChapterIndex = this.data.minChapterIndex,

      videoCatalogList = this.data.videoCatalogList;
    wx.navigateTo({
      url: '/pages/video_details_comment/video_details_comment?vid=' + videoCatalogList[maxChapterIndex].currVideoData[minChapterIndex].videoId,
    })
  },
  //记录播放记录
  record_video(vid) {
    let self = this,
      param = {
        curriculumId: self.data.cid,
        videoId: vid
      };
    util.wxReq(api().record_video.url, param, 'get', api().record_video.hr).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    })
  },

  //底部按钮

  bottom_btn() {
    let courseStatus = this.data.courseStatus;

    if (courseStatus == 3) {

      wx.showToast({
        title: '暂无课程列表',
        icon: 'none'
      })
    } else if (courseStatus == 2) {
      wx.navigateTo({
        url: '/pages/lijibaoming/lijibaoming',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    } else if (courseStatus == 1) {
      return false;
    } else if (courseStatus == 0) {

      wx.navigateTo({
        url: `/pages/wxPayPage/wxPayPage?id=${this.data.cid}&types=${this.data.coursType}&ctitle=${this.data.ctitle}&chapter=${this.data.couseinfoData.totalChapters}&studyNum=${this.data.couseinfoData.studyNum}`,
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.videoContext = wx.createVideoContext('couseVideo');
    console.log(this.videoContext, '----------------');
    if (wx.getStorageSync("token_key")) {
      this.getCurriculumCatalog();
    }

  },
  getCacheRecord() {
    let that = this;
    wx.getStorage({ //获取缓存记录
      key: `_${that.data.cid}_video_time`,
      success: function(res) {
        console.log(res);
        if (res.errMsg === "getStorage:ok") {
          console.log('--------------')
          wx.showModal({
            title: '温馨提示！',
            content: `您上次看到《${res.data.videoName}》的${util.time_utils(res.data.time)}`,
            confirmText: '继续观看',
            success(res_m) {
              if (res_m.confirm) {
                console.log('用户点击确定');

                that.setData({
                  maxChapterIndex: res.data.maxCouseId,
                  minChapterIndex: res.data.minCouseId,
                  video_url: res.data.vUrl,
                  // initial_time: res.data.time,
                  autoplay: true
                })
                that.videoContext.seek(res.data.time);
                that.videoContext.play();
                wx.showLoading({
                  title: '奋力加载中~',
                })
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          })
        }
      },
    })
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
    if (!this.data.onloads) {
      let commentParame = this.data.commentParame;
      commentParame.pageNo = 1;
      this.setData({
        commentList: [],
        commentParame: commentParame
      })
      this.getComment();

      console.log('onShow')
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

    //观看记录存入缓存
    //存课程id，课程下的大章节，小章节，视频名字，之前的播放时间,视频链接
    // let cid=this.data.cid,
    //   maxChapterIndex = this.data.maxChapterIndex,
    //   minChapterIndex = this.data.minChapterIndex,
    //   this_paly_time = this.data.this_paly_time,
    //   videoSrc = this.data.videoSrc,
    //   videoCatalogList = this.data.videoCatalogList,
    //   that=this,
    //   videoName = videoCatalogList[maxChapterIndex].currVideoData[minChapterIndex].videoName;
    // console.log(this_paly_time,'----------------------')
    // if (this_paly_time != 0 || videoSrc!=''){
    //   wx.setStorage({
    //     key: `_${that.data.cid}_video_time`,
    //     data: {
    //       cid: cid,
    //       videoName: videoName,
    //       time: this_paly_time,
    //       maxCouseId: maxChapterIndex,
    //       minCouseId:minChapterIndex,
    //       vUrl: videoSrc
    //     },
    //   })
    //   }
    this.setData({
      onloads: false
    });
    this.videoContext.pause()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

    //观看记录存入缓存
    //存课程id，课程下的大章节，小章节，视频名字，之前的播放时间,视频链接
    let cid = this.data.cid,
      maxChapterIndex = this.data.maxChapterIndex,
      minChapterIndex = this.data.minChapterIndex,
      this_paly_time = this.data.this_paly_time,
      videoSrc = this.data.videoSrc,
      videoCatalogList = this.data.videoCatalogList,
      that = this,
      videoName = videoCatalogList[maxChapterIndex].currVideoData[minChapterIndex].videoName;
    // console.log(this_paly_time, '----------------------')
    if (this_paly_time != 0) {
      wx.setStorage({
        key: `_${that.data.cid}_video_time`,
        data: {
          cid: cid,
          videoName: videoName,
          time: this_paly_time,
          maxCouseId: maxChapterIndex,
          minCouseId: minChapterIndex,
          vUrl: videoSrc
        },
      })
    }

    this.record_video(videoCatalogList[maxChapterIndex].currVideoData[minChapterIndex].videoId); //记录播放
  },
  bindscroll: function(e) {
    let posVlan = this.data.posVlan;
    let scorllTopVla = this.data.scorllTopVla;
    // console.log(e.detail.scrollTop);
    if (e.detail.scrollTop > scorllTopVla) {
      if (posVlan != 'position_f') {
        this.setData({
          posVlan: 'position_f'
        })
        console.log('固定');
      } else {

      }

    } else if (e.detail.scrollTop < scorllTopVla) {

      if (posVlan != 'position_s') {
        this.setData({
          posVlan: 'position_s'
        })
        console.log('不固定');
      } else {

      }
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  bindscrolltolower: function() {
    let commentBottom = this.data.commentBottom,
      commentParame = this.data.commentParame,
      video_tab = this.data.video_tab,
      pageNo = commentParame.pageNo;

    if (video_tab == 3) {
      if (commentBottom) {
        commentParame.pageNo = pageNo + 1;
        this.setData({
          commentParame: commentParame
        })
        this.getComment();
      } else {
        wx.showToast({
          title: '没有更多~',
          icon: 'none',
          duration: 2000
        })
      }
    }
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
      title: that.data.ctitle,
      path: '/pages/video_details/video_details?vid=' + that.data.cid + '&vname=' + that.data.ctitle,

    }
  }
})