// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    err_page: false,
    success_page: false,
    simulation2: [],
    search_datas: [],
    simulation: [{
        img: '../../images/ship-1.png',
        title: '建筑施工真账实操',
        star: [{
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }],
        fs: '5.0分',
        zz: '朱长江',
        pec: '1314523人学习'
      },
      {
        img: '../../images/ship-2.png',
        title: '如何顺利完成年终结账',
        star: [{
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }],
        fs: '3.0分',
        zz: '朱长江',
        pec: '1314523人学习'
      },
      {
        img: '../../images/ship-1.png',
        title: '会计概念与目标',
        star: [{
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }],
        fs: '4.0分',
        zz: '朱长江',
        pec: '1314523人学习'
      },
      {
        img: '../../images/ship-2.png',
        title: '会计基本假设与会计',
        star: [{
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }],
        fs: '5.0分',
        zz: '朱长江',
        pec: '1314523人学习'
      },
      {
        img: '../../images/ship-2.png',
        title: '建筑施工真账实操 ',
        star: [{
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }],
        fs: '3.0分',
        zz: '朱长江',
        pec: '1314523人学习'
      },
      {
        img: '../../images/ship-1.png',
        title: '会计概念与目标',
        star: [{
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }, {
          img: "../../images/star.png"
        }],
        fs: '5.0分',
        zz: '朱长江',
        pec: '1314523人学习'
      }
    ]
  },
  // 搜索事件
  search: function(e) {
    let search_val = e.detail.value.searchname,
      simulation = this.data.simulation,
      search_datas = this.data.search_datas,
      that = this;
    if (search_val) {
      let rest = simulation.filter((val, index, arr) => val.title.includes(search_val));
      //利用es6的includes进行模拟模糊查询

      if (rest.length > 0) {
        that.setData({
          success_page: true,
          err_page: false,
          simulation2: rest
        })
      } else if (rest.length == 0) {
        that.setData({
          success_page: false,
          err_page: true
        })

      }
      
      if (search_datas) {  //判断之前缓存是否有
        let rs = search_datas.some((val, index, arr) => val.title == search_val); //查询前面存在的数据
        if (!rs) {
          search_datas.push(search_val);
          //存入缓存
          wx.setStorage({
            key: 'search_data',
            data: search_datas
          })
          that.setData({
            search_datas: search_datas
          })
        }

      }
    }

  },

  search_tow: function(s) {

    let search_val = s.currentTarget.dataset.val,
      simulation = this.data.simulation;
    // 利用es6的includes进行模拟模糊查询
    let rest = simulation.filter((val, index, arr) => val.title.includes(search_val));

    // let rest = (function () {
    //   var arr = [];
    //   for (let i = 0; i < simulation.length; i++) {
    //     console.log(simulation);
    //     if (simulation[i].title.indexOf(search_val) >= 0) {
    //       arr.push(simulation[i]);
    //     }
    //   }
    //   return arr;
    // })();
    console.log(rest);
    if (rest.length > 0) {
      this.setData({
        success_page: true,
        err_page: false,
        simulation2: rest
      })
    } else if (rest.length == 0) {
      this.setData({
        success_page: false,
        err_page: true
      })
    }

  },
//删除缓存
  dee_search_datas: function() {
    let that=this;
    wx.showModal({
      title: '温馨提示',
      content: '确认删除全部历史记录~',
      success(res) {
        if (res.confirm) {
          that.setData({
            search_datas: []//清空渲染
          })
          wx.removeStorage({
            key: 'search_data'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  bindKeyInput: function(e) {
    let val = e.detail.value;
    if (!val) {//同步判断文本框没有数据时返回初始样子
      this.setData({
        err_page: false,
        success_page: false,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    //获取用户搜索缓存数据
    wx.getStorage({
      key: 'search_data',
      success: function(res) {
        

        if (res.errMsg === "getStorage:ok") {
          let itit_data = res.data;
          if (itit_data.length>=10){
            itit_data.shift();
            
          }
          that.setData({
            search_datas: res.data
          })

        }


      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

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

  }
})