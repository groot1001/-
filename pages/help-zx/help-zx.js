// miniprogram/pages/help-zx/help-zx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    currentTab: 0,
    xxneir: [{
      img: '../../images/help-xx1.png',
      name: '尚星月',
      fs: '198分',
      talk: '学习应该是一种本能，就要有活到老学到老的信念。很多考生都会学得初级经济法基础难，个人觉得经济法主要还是要靠理解，在理解的基础上记忆，多归纳多总结，你会发现经济也可以so easy。'
    }, {
      img: '../../images/help-xx2.png',
      name: '张伟',
      fs: '285分',
      talk: '学习应该是一种本能，就要有活到老学到老的信念。很多考生都会学得初级经济法基础难，个人觉得经济法主要还是要靠理解，在理解的基础上记忆，多归纳多总结，你会发现经济也可以so easy。'
    }, {
      img: '../../images/help-xx3.png',
      name: '蓝倩',
      fs: '  474分',
      talk: '学习应该是一种本能，就要有活到老学到老的信念。很多考生都会学得初级经济法基础难，个人觉得经济法主要还是要靠理解，在理解的基础上记忆，多归纳多总结，你会发现经济也可以so easy。'
    }],
    teachers: [{
        logo: "../../images/help-teach1.jpg",
        name: "张肖玲",
        grade: "高级会计师",
        school: "南京师范大学毕业",
        experience: "23年会计教学经验",
        style: "风趣幽默、思路清晰、通俗易懂、紧扣考点、重点突出",
        tenet: "让每位学员快速拿证，轻松上岗！"
      },
      {
        logo: "../../images/cxm.jpg",
        name: "陈星明",
        grade: "特约讲师",
        school: "北京大学毕业",
        experience: "现任会计高级教授",
        style: "讲解通俗易懂，剖析精辟透彻；归纳简明易记，考点准确到位。",
        tenet: "没有听不懂的学员，只有讲不明的老师。"
      },
      {
        logo: "../../images/hmh.jpg",
        name: "胡明辉",
        grade: "始终专注会计教育",
        school: "湖北大学毕业",
        experience: "细心讲解，易于理解，收获了学员的尊重。",
        style: "风趣幽默、思路清晰、通俗易懂、紧扣考点、重点突出",
        tenet: "如果有什么需要明天做的事，最好现在就开始。"
      }

    ],
    school_adders: [{
        name: '龙岗公司地址',
        adderss: '深圳市龙岗区爱联地铁站A出口100米处 （爱联股份大厦70A）',
      lat: "22.696290", 
      lng:"114.234180"
      },
      {
        name: '光明公司地址',
        adderss: '深圳市光明新区公明街道办宝安路11号2楼（平安银行2楼）',
        lat: "22.781200",
        lng: "113.889540"
      },
      {
        name: '龙华公司地址',
        adderss: '深圳市龙华新区民治街道民康路213号蓝坤大厦11楼1101号(民治地铁站 A出口)',
        lat: "22.613328",
        lng: "114.040461"
      },
      {
        name: '宝安公司地址',
        adderss: '深圳市宝安区西乡大道288号宝源华丰经济总部大厦A座1202（西乡地铁站旁）',
        lat: "22.572380",
        lng: "113.862470"
      },
      {
        name: '福田公司地址',
        adderss: '深圳市福田区车公庙天祥大厦12B-D 12B-E 车公庙地铁站 F出口',
        lat: "22.533090",
        lng: "114.031050"
      },
      {
        name: '坪山公司地址',
        adderss: '广东省深圳市坪山区坪山街道深汕路168号六和城H座1011室',
        lat: "22.693990",
        lng: "114.338860"
      },
      {
        name: '惠州公司地址',
        adderss: '惠阳区东华大道中16号进贤楼602',
        lat: "22.784731",
        lng: "114.452774"
      },
      {
        name: '广州公司地址',
        adderss: '广州市天河区中山大道车陂龙口大街汇德商业大厦506（车陂地铁站旁）',
        lat: "23.122762",
        lng: "113.398621"
      },
      {
        name: '惠州分部地址',
        adderss: '惠城区演达大道2号海信金融广场（曼哈顿广场）15楼17 - 18号、20号',
        lat: "23.072920",
        lng: "114.414140"
      },
    ]

  },
  go_nav:function(g){
    let lat=g.currentTarget.dataset.lat,
       address = g.currentTarget.dataset.address,
      lng = g.currentTarget.dataset.lng;
    wx.openLocation({
      latitude: Number(lat),
      longitude: Number(lng),
      scale: 18,
      address: address
    })
    
  },
  swichNav: function(e) {
    console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function(e) {
    console.log(e);
    this.setData({
      currentTab: e.detail.current,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    var that = this;
    that.setData({ currentTab: options.current_id})
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    console.log(that.data.winHeight);
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