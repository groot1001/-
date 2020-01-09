const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//转换时间--->秒转分
let time_utils = currentTime => {
  let cm, cs;
  cm = Math.floor((currentTime / 60 % 60)) < 10 ? '0' + Math.floor((currentTime / 60 % 60)) : Math.floor((currentTime / 60 % 60));
  cs = Math.floor((currentTime % 60)) < 10 ? '0' + Math.floor((currentTime % 60)) : Math.floor((currentTime % 60));
  return cm + ":" + cs;
}
//时间搓转换日期
const time_rub = (this_time, past_time) => {
  let past_times = new Date(past_time).getTime(),
    this_times = new Date(this_time).getTime(),
    rest = this_times - past_times,
    unit;
  if (rest >= 1000 && rest < 60000) {
    unit = Math.floor(rest / 1000) + '秒前';
  } else if (rest >= 60000 && rest < 3600000) {
    unit = Math.floor(rest / 60000) + '分钟前';
  } else if (rest >= 3600000 && rest < 86400000) {
    unit = Math.floor(rest / 3600000) + '小时前';
  } else if (rest >= 86400000) {
    unit = Math.floor(rest / 86400000) + '天前';
    if (Math.floor(rest / 86400000) > 3) {
      let date = new Date(past_time),
        Y = date.getFullYear() + '-',
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
        D = date.getDate() + ' ';
      unit = Y + M + D;
    }
  }
  return unit;
}



/**pormise 请求
 *var $=require('../../utils/util.js')
 * $.wxRest('test.php',{name:name},"Post").then(res => {
      console.log(res.data)
    })

*/
let wxReq = (url, param = {}, method = 'POST',hr={}) => {
  // console.log(param,'------------------param',)
  // console.log(method,'------------------method',)
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: param,
      method: method,
      header: hr,
      dataType:'json',
      success(res) {
        
        // console.log(res)
        if (res.statusCode ==200) {
          resolve(res);
          
        } else { //返回错误提示信息
          reject({ msg: res.errMsg, code: res.statusCode});
        }
        
      },
      error: function(e) {
        reject(e,'网络出错~');

      }
    })
  })
}

/**pormise 定位获取
 *var $=require('../../utils/util.js')
 * $.wx_getLoc('wgs84').then(res => {
      console.log(res)
    })
*/
const wx_getLoc = (types = 'wgs84') => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: types,
      success(res) {
        resolve(res);
      },
      fail: function(e) {
        reject(e);
      }
    })
  })
}
/**pormise 选择图片
*var $=require('../../utils/util.js')
* $.wx_choImg(parm,parm...).then(res => {
    console.log(res)
  })
  original:原图，compressed：压缩
  album：相册 ，camera：相机
*/
const wx_choImg = (count = 1, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera']) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1,
      sizeType: sizeType,
      sourceType: sourceType,
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        resolve(res);
      },
      fail: function(e) {
        reject(e);
      }
    })
  })
}

/**pormise 上传图片

*/
const wx_uplFile = (url, filePath, formData = {
  user: 'test'
}) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'Filedata',
      formData: formData,
      success(res) {
        resolve(res.data);

      },
      fail: function (e) {
        reject(e);
      }
    })
  })
}
const uploadImage = (tempFilePaths, url) => {//上传多张图片
  return new Promise((presolve, preject) => {
    let uploads = []
    tempFilePaths.forEach((item, i) => {
      uploads[i] = new Promise((resolve) => {
        wx.uploadFile({
          url: url,
          filePath: item,
          name: 'Filedata',
          header: {
            'Content-Type': 'multipart/form-data'
          },
          formData: {
            'Filedata': item
          },
          success(res) {
            resolve('http://www.xuelejia.com/' + JSON.parse(res.data).data.returnurl)
            console.log(JSON.parse(res.data).data.returnurl);
          },
          fail(err) {
            console.log(err)
            wx.hideLoading()
          }
        })
      })
    })

    Promise.all(uploads).then(res => {
      //图片上传完成
      presolve(res)
      wx.hideLoading()
    }).catch(err => {
      preject(err)
      wx.hideLoading()
      wx.showToast({
        title: '上传失败请重试',
        icon: 'none'
      })
    })
  })
}



module.exports = {
  formatTime,
  time_utils,
  wxReq,
  wx_getLoc,
  wx_choImg,
  wx_uplFile,
  time_rub,
  uploadImage

}