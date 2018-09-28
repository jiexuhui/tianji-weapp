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
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 800,
    matchlist:[],
    gametypes:[],
    activeCategoryId: 1
  },
  onLoad: function () {
    this.setData({
      userInfo: app.getUserinfo()
    });
    this.matchList();
  },

  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.id
    });
    this.matchList();
  },

  matchList: function () {
    let that = this;
    server.matchList({ gametype: this.data.activeCategoryId}).then(res => {
      console.log("res:", res);
      console.log("data0:", res.data);
      if (res.code === 200) {
        for (let i = 0; i < res.data[0].length; i++) {
          res.data[0][i].tname = res.data[0][i].tname.split(',');
          res.data[0][i].tlogo = res.data[0][i].tlogo.split(',');
          res.data[0][i].tid = res.data[0][i].tid.split(',');
        }
        
        that.setData({
          matchlist: res.data[0],
          gametypes: res.data[1]
        });
      } else {
        util.showErrorToast(res.data.msg);
      }
    });
  },
  //跳转详情页
  jumptodetail: function (e) {
    console.log(e);
    let that = this;
    var index = e.currentTarget.dataset.index;
    console.log("that.data.matchlist[index]",that.data.matchlist[index])
    var matchid = that.data.matchlist[index].id;
    var model = JSON.stringify(that.data.matchlist[index]);
    var matchdetailStore = wx.getStorageSync("matchdetail");
    if (matchdetailStore) {
      wx.removeStorageSync("matchdetail");
    }
    wx.setStorageSync("matchdetail", (that.data.matchlist[index]))
    wx.navigateTo({
      url: '/pages/matchdetail/matchdetail?model=' + model,
    })
  },

  showUserPannel: function(){
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
  gotoDetail: function(e) {
    let that = this;
    var index = e.currentTarget.dataset.index;
    var goodsid = that.data.imgUrls[index].goodsid;
    var model = JSON.stringify(that.data.imgUrls[index]);
    wx.navigateTo({
      url: '/pages/goods/goods?model=' + model,
    })
  },


  //跳转到申请页
  jumplist: function (e) {
    console.log(e);
    let that = this;
    wx.navigateTo({
      url: '/pages/anchorcase/anchorcase',
    })
  },

  addGoods: function(e) {
    let that = this;
    console.log(e);
    var index = e.currentTarget.dataset.index;
    
    var lists = wx.getStorageSync('lists');
    if(!lists){
      lists = [];
    } 
    var listids = wx.getStorageSync('listids');
    if(!listids) {
      listids = [];
    }

    lists.push(that.data.goodslist[index]);
    listids.push(that.data.goodslist[index].goodsid);

    wx.setStorageSync('lists', lists);
    wx.setStorageSync('listids', listids);

    server.addcheckedGoods({ openid: that.data.userInfo.openid, goodsid: that.data.goodslist[index].goodsid}).then(res => {
      console.log("res:", res);
      if (res.code === 200) {
        that.data.goodslist[index].isadd = 1;
        that.setData({
          goodslist: that.data.goodslist
        });
      } else {
        util.showErrorToast(res.data.msg);
      }
    });
    
  },
  onShow: function () {
    // 页面显示
    // this.goodsList();
  },
  /**
   * 用户点击右上角分享
   */
   onShareAppMessage: function () {
    return {
      title: '天机电竞',
      desc: '赛事',
      path: '/pages/index/index'
    }
  }
})

