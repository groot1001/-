var cf = require("/apiConfig.js");
module.exports = {

login: {
  url: cf._www + '/WxDevelopersAPI/GetWxUserInfo',
    hr: {
      'content-type': 'application/json',
    }
  },
  getUserInfo:{
    url: cf._www + '/WxDevelopersAPI/GetAnthons',
    hr: {
      'content-type': 'application/json',
    }
  },
  getAnthonPhone:{
    url: cf._www + '/WxDevelopersAPI/GetAnthonPhone',
    hr: {
      'content-type': 'application/json',
    }
  }

}