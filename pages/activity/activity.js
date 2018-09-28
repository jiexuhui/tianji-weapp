//index.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var server = require('../../services/server.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: wx.getStorageSync(app.globalData.userInfoKey),
    hasUserInfo: app.globalData.hasUserInfo,
    imgUrls: [
      'http://img.zcool.cn/community/011d455af2e4c7a80121604526b480.jpg@1280w_1l_2o_100sh.jpg',
      'http://img.zcool.cn/community/01e1285acc8650a8012138675ab2a2.jpg@1280w_1l_2o_100sh.jpg',
      'http://img.zcool.cn/community/01756b5add7e92a80120927b3af0d8.jpg@1280w_1l_2o_100sh.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 800,
    activityInfo: {},
    selectteam: 0
  },
  onLoad: function () {
    this.setData({
      userInfo: app.getUserinfo()
    })
    this.getActivityInfo();
  },
  getActivityInfo: function () {
    let that = this;
    server.getActivityInfo({openid: that.data.userInfo.openid}).then(res => {
      console.log("res:", res);
      console.log("data0:", res.data);
      if (res.code === 200) {
        res.data[0][0].tname = res.data[0][0].tname.split(',');
        res.data[0][0].tlogo = res.data[0][0].tlogo.split(',');
        res.data[0][0].tid = res.data[0][0].tid.split(',');
        that.setData({
          activityInfo: res.data[0][0],
          selectteam: res.data[0][0].steam
        });
      } else {
        util.showErrorToast(res.data.msg);
      }
    });
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
  //选择队伍
  selectTeam: function (e) {
    console.log(e);
    let that = this;
    var index = e.currentTarget.dataset.index;
    var tname = e.currentTarget.dataset.name;
    wx.showModal({
      title: "确定选择" + tname + "吗？",
      content: "选定后不可更改",
      success: function(res){
        if(res.confirm) {
          server.selectTeam({ matchid: that.data.activityInfo.id, openid: that.data.userInfo.openid, teamid: index }).then(res => {
            console.log("res:", res);
            if (res.code === 200) {
              wx.showToast({
                title: res.msg
              })
              that.setData({
                selectteam: index
              });
            } else {
              util.showErrorToast(res.msg);
            }
          });
        } else if (res.cancel) {
          
        }
      }
    });
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '天机电竞',
      desc: '猜冠军，赢大奖！',
      path: '/pages/activity/activity'
    }
  }
})
