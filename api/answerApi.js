var affix = require("./apiConfig.js");
module.exports = function() {
  return {
    interation_list: { //问答列表
      url: affix._www + '/API/GetBBSList',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    askdetailList: { //问题详情列表
      url: affix._www + '/API/GetBBSTopic',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    sendreply: { //评论列表
      url: affix._www + '/API/BBSTopicInsert',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    asklike: { //点赞
      url: affix._www + '/API/BBSLikes',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    askcollect: { //收藏
      url: affix._www + '/API/BBSCollection',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    askconcern: { //收藏
      url: affix._www + '/API/BBSFollowInsert',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    questionCategory: { //问题分类
      url: affix._www + '/API/GetQuestionCategory',
      hr: {
        'content-type': 'application/json'
      }
    },
    sendQuestion: { //发表问题
      url: affix._www + '/API/IssueQuestion',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    uploadmyfile: {
      url: affix._www + '/API/UpLoadImage',
    }
  }
}