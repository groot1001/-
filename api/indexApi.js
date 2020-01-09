var cf = require("/apiConfig.js");
module.exports = function(){
 
  return{
    carousel: {//轮播数据
      url: cf._www + '/API/Carousel',
      hr: {
        'content-type': 'application/json',
      }
    },
    recomCurriculum: {//举荐视频数据
      url: cf._www + '/API/RecomVideo',
      hr: {
        'content-type': 'application/json',
        'token': wx.getStorageSync("token_key")
      }
    },
    teacherList: {//教师数据
      url: cf._www + '/API/TeacherList',
      hr: {
        'content-type': 'application/json',
      }
    },
    getNewsPreferen: {//政策数据
      url: cf._www + '/API/getNewsPreferen',
      hr: {
        'content-type': 'application/json',
      }
    },
    getnewanswer: {//政策数据
      url: cf._www + '/API/LatestInteract',
      hr: {
        'content-type': 'application/json',
      }
    },
  }
  
}