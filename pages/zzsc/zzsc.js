// miniprogram/pages/zzsc/zzsc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    this_id: 0,
    this_id_min: 0,
    max_caregory_idnex: 0,
    min_caregory_idnex: 0,
    chlid_cate: [{ video_category_min: '筛选' }, { video_category_min: '最新' }, { video_category_min: '热门'} ],
    video_chlids: [],
    video_list_kz: [{
      vcid_m: 1,
      video_category_max: "小规模纳税人",
      video_list: [{
        vcid: 1,
        video_category_min: "会计实务",
        child_video: [{
          img: '../../images/chuji_01',
          video_tit: "2018初级《经济法基础》新大纲1初级01",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        {
          img: '../../images/chuji_03',
          video_tit: "2018初级《经济法基础》新大纲2初级02",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        ]
      },
      {
        vcid: 2,
        video_category_min: "会计实务02",
        child_video: [{
          img: '../../images/chuji_04',
          video_tit: "2018初级《经济法基础》新大纲3初级03",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        {
          img: '../../images/chuji_05',
          video_tit: "2018初级《经济法基础》新大纲4初级04",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        ]
      },
      {
        vcid: 3,
        video_category_min: "会计实务03",
        child_video: [{
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲6初级05",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        {
          img: '../../images/chuji_06',
          video_tit: "2018初级《经济法基础》新大纲7初级06",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        ]
      },
      {
        vcid: 4,
        video_category_min: "经济基础01",
        child_video: [{
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲8初级07",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        {
          img: '../../images/chuji_01',
          video_tit: "2018初级《经济法基础》新大纲9初级08",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        ]
      },
      {
        vcid: 6,
        video_category_min: "经济基础02",
        child_video: [{
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲11初级09",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        {
          img: '../../images/chuji_01',
          video_tit: "2018初级《经济法基础》新大纲12初级10",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        ]
      }
      ]
    },
    {
      vcid_m: 2,
      video_category_max: "所得税汇算",
      video_list: [{
        vcid: 2,
        video_category_min: "会计实务04",
        child_video: [{
          img: '../../images/chuji_03',
          video_tit: "2018初级《经济法基础》新大纲13",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        {
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲14",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        ]
      },
      {
        vcid: 4,
        video_category_min: "经济基础03",
        child_video: [{
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲15",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        {
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲16",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        ]
      }
      ]
    },
    {
      video_category_max: "一般纳税人",
      vcid_m: 3,
      video_list: [{
        vcid: 3,
        video_category_min: "会计实务05",
        child_video: [{
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲17",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        {
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲18",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        ]
      },
      {
        vcid: 6,
        video_category_min: "经济基础06",
        child_video: [{
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲19",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        {
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲21",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        ]
      }
      ]
    },
    {
      video_category_max: "注册会计师",
      vcid_m: 4,
      video_list: [{
        vcid: 4,
        video_category_min: "经济基础07",
        child_video: [{
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        {
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        ]
      },
      {
        vcid: 3,
        video_category_min: "会计实务06",
        child_video: [{
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        {
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        ]
      }
      ]
    },
    {
      video_category_max: "2018初级",
      vcid_m: 5,
      video_list: [{
        vcid: 5,
        video_category_min: "会计实务06",
        child_video: [{
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        {
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        ]
      },
      {
        vcid: 2,
        video_category_min: "会计实务07",
        child_video: [{
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        {
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        ]
      }
      ]
    },
    {
      video_category_max: "2019初级",
      vcid_m: 6,
      video_list: [{
        vcid: 6,
        video_category_min: "经济基础08",
        child_video: [{
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        {
          img: '../../images/chuji_02',
          video_tit: "2018初级《经济法基础》新大纲",
          score: 5,
          author: "朱长江",
          viewing_number: 1314523
        },
        ]
      }]
    }
    ]
  },
  // 点击一级分类
  findstore: function (e) {
    let vcid = e.currentTarget.dataset.vcid,
      itidata = this.data.video_list_kz,
      indexmax = e.currentTarget.dataset.indexmax;
    let suoe = itidata[indexmax];
    console.log(indexmax);
    if (indexmax != "-1") { //点击其他项
      console.log("------------")
      let video_chlids = [];
      for (let s of suoe.video_list) {
        video_chlids.push(...s.child_video)
      }
      console.log(video_chlids);
      this.setData({
        this_id: vcid,
        chlid_cate: suoe.video_list,
        video_chlids: video_chlids,
        indexmax: indexmax
      })

    } else if (indexmax === "-1") { //点击全部

      let itidata = this.data.video_list_kz,
        rest = [];
      for (let val of itidata) {
        let tepdata = val.video_list;
        for (let tvalt of tepdata) {
          rest.push(tvalt)
        }
      }
      this.setData({
        this_id: vcid,
        chlid_cate: [{ video_category_min: '筛选' }, { video_category_min: '最新' }, { video_category_min: '热门' }],
        video_chlids: this.data.video_chlids2
      })
    }

  },

  // 点击二级分类

  findstore_min: function (e) {
    let indexmin = e.currentTarget.dataset.indexmin,
      itidata = this.data.video_list_kz,
      indexmax = this.data.indexmax,
      vcid = e.currentTarget.dataset.vcid,
      datasoue = itidata[indexmax]
      ;
    console.log(vcid);
    if (indexmin != "-1") {

      if (indexmax != "-1") {
        console.log("------------");
        let teparr;
        this.setData({
          this_id_min: vcid,
          video_chlids: datasoue.video_list[indexmin].child_video
        })
      }
    } else if (indexmin == "-1") {
      if (indexmax != "-1") {
        // for(let of ){

        // }
        this.setData({
          this_id_min: vcid,
          video_chlids: this.data.video_chlids2
        })
      } else if (indexmax == "-1") {
        this.setData({
          this_id_min: vcid,
          video_chlids: this.data.video_chlids2
        })
      }

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    /***初次加载所有分类 */
    let itidata = this.data.video_list_kz,
      rest = [],
      video_chlids = [];
    for (let val of itidata) {
      let tepdata = val.video_list;
      for (let tvalt of tepdata) {
        rest.push(tvalt);
        video_chlids.push(...tvalt.child_video);

      }
    }
    this.setData({
      // chlid_cate: rest,
      video_chlids: video_chlids,
      video_chlids2: video_chlids
    })
    console.log(rest)

  },
  to_see_video: function () {
    wx.navigateTo({
      url: '/pages/video_details/video_details',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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
     wx.showToast({
       title: '没有更多啦~',
       icon:'none'
     })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})