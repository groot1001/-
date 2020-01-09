var cf = require("/apiConfig.js");//接口前缀域名
module.exports =function() {
 return{

   textualResearchList: {//视频课程列表
     url: cf._www + '/API/TextualResearchList',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   },
   couseCategory: {//课程分类集合
     url: cf._www + '/API/GetVideoCats',
     hr: {
       'content-type': 'application/json'
     }
   },
   curiculumInfo: {//课程信息数据
     url: cf._www + '/CAPI/CuriculumInfo',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   },
   curriculumDetails: {//课程详情
     url: cf._www + '/CAPI/CurriculumDetails',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   },
   curriculumHandout: {//课程讲义
     url: cf._www + '/CAPI/CurriculumHandout',
     hr: {
       'content-type': 'application/json'
     }
   },
   curriculumCatalog: {//课程讲义
     url: cf._www + '/CAPI/CurriculumCatalog',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   },
   curriculumLike: {//课程的点赞和取消点赞
     url: cf._www + '/CAPI/CurriculumLike',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   },
   videoCollection: {//课程的收藏和取消收藏
     url: cf._www + '/API/VideoCollection',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   },
   teacherLike: {//课程的老师关注和取消关注
     url: cf._www + '/CAPI/TeacherLike',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   },
   curriculumQuestion: {//课程的评论列表
     url: cf._www + '/CAPI/CurriculumQuestion',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   },
   videoLike: {//课程的评论的点赞
     url: cf._www + '/CAPI/VideoLike',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   },
   addCurriculumQuestion: {//发表评论
     url: cf._www + '/CAPI/AddCurriculumQuestion',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   },
   record_video: {  //记录播放记录
     url: cf._www + '/API/VideoPlaybackRecord',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   },
   course_pic: {  //课程价格信息
     url: cf._www + '/API/CurriculumScore',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   },
   getUserDevelopers: {  //查看用户是否使用过微信授权登录
     url: cf._www + '/WxOrder/GetUserDevelopers',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   },
   payOrder: {  //解密用户openid,
     url: cf._www + '/WxOrder/Index',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   },
   getAnthonUserInfo: {  //填补用户信息
     url: cf._www + '/WxDevelopersAPI/GetPayUserInfo',
     hr: {
       'content-type': 'application/json',
       'token': wx.getStorageSync("token_key")
     }
   }
 }
}