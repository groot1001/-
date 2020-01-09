// pages/test/test.js
Page({

  /**
   * 页面的初始数据**/
 data: {
    // 拖拽参数
    writePosition: [80, 60], //默认定位参数
    writesize: [0, 0],// X Y 定位
    window: [0, 0], //屏幕尺寸
    write: [0, 0], //定位参数
    scrolltop: 0,//据顶部距离
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 在页面中定义插屏广告
    let that = this;
    that.getSysdata();
  },
  //计算默认定位值
  getSysdata: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (e) {
        that.data.window = [e.windowWidth, e.windowHeight];
        var write = [];
        write[0] = that.data.window[0] * that.data.writePosition[0] / 100;
        write[1] = that.data.window[1] * that.data.writePosition[1] / 100;
        console.log(write, 45)
        that.setData({
          write: write
        }, function () {
          // 获取元素宽高
          wx.createSelectorQuery().select('.collectBox').boundingClientRect(function (res) {
            console.log(res.width)
            that.data.writesize = [res.width, res.height];
          }).exec();
        })
      },
      fail: function (e) {
        console.log(e)
      }
    });
  },
  //开始拖拽  
  touchmove: function (e) {
    var that = this;
    var position = [e.touches[0].pageX - that.data.writesize[0] / 2, e.touches[0].pageY - that.data.writesize[1] / 2 - this.data.scrolltop];
    that.setData({
      write: position
    });
  },
  onPageScroll(e) {
    this.data.scrolltop = e.scrollTop;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})