var affix = require("./apiConfig.js");
module.exports = function() {
  return {
    myaskList: { //我的关注列表
      url: affix._www + '/API/GetMyFollow',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    myplayList: { //我的播放列表
      url: affix._www + '/API/CurriculumRecordList',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    deleteplayRecode: { //删除播放记录
      url: affix._www + '/API/VideoPlayRecordDelete',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    mycourseList: { //我的课程
      url: affix._www + '/API/GetNewMyVideoList',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    myanswerList: {//我的关注
      url: affix._www + '/API/GetMyFollow',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    myvideoList: { //我的收藏--视频
      url: affix._www + '/API/GetMyCollectList',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    delvideocollect: { //删除视频收藏
      url: affix._www + '/API/MyCollectionVideoDelete',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    myqueList: { //我的收藏--题目
      url: affix._www + '/API/MyCollectionCourceList',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    delquecollect: { //我的收藏--题目删除
      url: affix._www + '/API/MyCollectionCourceDelete',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    newpolicyList: { //首页--更多最新政策列表
      url: affix._www + '/API/NewsList',
      hr: {
        'content-type': 'application/json'
      }
    },
    newpolicydetailList: { //首页--更多最新政策详情列表
      url: affix._www + '/API/NewsDetails',
      hr: {
        'content-type': 'application/json'
      }
    }
  }
}