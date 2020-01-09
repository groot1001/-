var cf = require("/apiConfig.js");
module.exports = function () {
  return {
    chapterList: {//章节列表
      url: cf._www + '/API/GetCourseBigCategory',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    minChapterList: {//查询子节
      url: cf._www + '/API/GetCourseSubCategory',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    subjectList: {//新版查询子节下的所有题目
      url: cf._www + '/CourseAPI/GetCourseChapterPractice',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    // subjectList: {//查询子节下的所有题目
    //   url: cf._www + '/API/GetSectionSubject',
    //   hr: {
    //     'content-type': 'application/json',
    //     'token': wx.getStorageSync("token_key")
    //   }
    // },
    // makeSubject: {//新版做题
    //   url: cf._www + '/CourseAPI/AnswerInsert',
    //   hr: {
    //     'content-type': 'application/json',
    //     'token': wx.getStorageSync("token_key")
    //   }
    // },
    makeSubject: {//旧版做题
      url: cf._www + '/API/GetUserAnswer',
      hr: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync("token_key")
      }
    },
    answerReport: {//新版做完题返回的结果
      url: cf._www + '/API/GetUserAnswerReport',
      // url: cf._www + '/API/GetUserAnswerReport',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    getCourseQuestionList: {//获取大列表包含2级类
      url: cf._www + '/API/GetCourseQuestionList',
      hr: {
        'content-type': 'application/json'
      }
    },
    getCourseQuestionCategory: {//三级类目
      url: cf._www + '/API/GetCourseQuestionCategory',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    }
    
  }
}