// miniprogram/pages/wdgz/wdgz.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gz: [{ img: '../../images/gz-tx.png', name: '暮先森', fabu: '2018-01-16 13:17发布', wenti: '【今日话题】你见过最奇葩的年会奖品是啥？', huifu: '有东西就不错了，啥都没有，没有年会', yd: '661', hf: '18', hftime:'2018-01-17 14:18回复'},
      { img: '../../images/gz-tx2.png', name: 'Lion-Chan', fabu: '2018-01-16 13:17发布', wenti: '【今日话题】想问下中途那家账填期初余额的时候不平衡，老板说是亏损的本年利润余额怎么处理？', huifu: '亏损，本年利润为负数即可', yd: '661', hf: '18', hftime: '2018-01-17 14:18回复' },
      { img: '../../images/gz-tx3.png', name: '世纪级高兴', fabu: '2018-01-16 13:17发布', wenti: '【今日话题】办公楼租赁合同应该怎么交印花税呢', huifu: '按租凭合同记载金额的千分之一计算印花税', yd: '661', hf: '18', hftime: '2018-01-17 14:18回复' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tit = options.title_name;

    wx.setNavigationBarTitle({
      title: tit == 'attention' ? '我的关注' : tit == 'reply' ? '我的回复' : tit == 'question' ? '我的提问':''
    })
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