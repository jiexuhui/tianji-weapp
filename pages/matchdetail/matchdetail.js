//index.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var server = require('../../services/server.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: wx.getStorageSync(app.globalData.userInfoKey),
    matchid: "",
    matchdetail: [],
    articles: []
  },
  onLoad: function () {
    this.setData({
      userInfo: app.getUserinfo()
    })
    var bean = wx.getStorageSync("matchdetail")
    if (bean.thumbs != "" && bean.thumbs != null) {
      var thumbs = bean.thumbs.split(",");
    }
    this.setData({
      matchdetail: bean
    });
    this.getMatchArticles();
  },
  showUserPannel: function () {
    let isShow = this.data.isShowUserPannel
    if (!isShow) {
      isShow = true
    } else {
      isShow = false
    }
    this.setData({
      isShowUserPannel: isShow
    })
  },
  //跳转详情页
  gotoDetail: function () {
    wx.navigateTo({
      url: '/pages/pageopen/pageopen',
    })
  },
  getMatchArticles: function (){
    var that = this;
    var matchid = this.data.matchdetail.id
    setInterval(function () {
      server.getMatchArticles({ matchid: matchid }).then(res => {
        console.log("res:", res);
        console.log("data0:", res.data);
        if (res.code === 200) {
          that.setData({
            articles: res.data[0]
          });
        } else {
          util.showErrorToast(res.data.msg);
        }
      });
    }, 3000)
  },

   /**
   * 用户点击右上角分享
   */
   onShareAppMessage: function () {
    return {
      title: '天机电竞',
      desc: '比赛详情',
      path: '/pages/matchdetail/matchdetail'
    }
  }
})

