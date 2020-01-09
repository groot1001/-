var affix = require("./apiConfig.js");
module.exports = {
 
    userlogin: { //登录
      url: affix._www + '/API/Login',
      hr: {
        'content-type': 'application/json'
      }
    },
    userregister: { //注册
      url: affix._www + '/API/Register',
      hr: {
        'content-type': 'application/json'
      }
    },
    registerCode: { //注册验证码
      url: affix._www + '/API/RegSmsCode',
      hr: {
        'content-type': 'application/json'
      }
    },
    forgetCode: { //修改密码验证码
      url: affix._www + '/API/ForgetPwdSmsCode',
      hr: {
        'content-type': 'application/json'
      }
    },
    usernewpsd: { //设置新密码
      url: affix._www + '/API/ForgetPwd',
      hr: {
        'content-type': 'application/json'
      }
    }
  
}