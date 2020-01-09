var cf = require("/apiConfig.js");
module.exports =function() {
  return{
    teacherDescList: {//列表
      url: cf._www + '/API/TeacherDescList',
      hr: {
        'content-type': 'application/json',
      }
    },
    teacherIntroduce: {//详情
      url: cf._www + '/API/TeacherIntroduce',
      hr: {
        'content-type': 'application/json',
      }
    }

  }
}