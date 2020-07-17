const config = require("../../config");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wallpaperList: [{}, {}], //轮播图
    bannerList: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    personalizedList: [] // 获取推荐歌单列表
  },

  //跳转搜索
  goSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //跳转歌手榜
  go_songer: function () {
    wx.navigateTo({
      url: '/pages/index/singerList/singerList',
    })
  },
  //跳转推荐mv
  go_MV: function () {
    wx.navigateTo({
      url: '/pages/index/recommendMv/recommendMv',
    })
  },
  //跳转歌单
  go_songsheet:function(){
    wx.navigateTo({
      url: '/pages/index/playList/playList',
    })
  },
  //跳转榜单排行
  go_toplist:function(){
    wx.navigateTo({
      url: '/pages/index/topList/topList',
    })
  },
  //获取首页banner
  getBanner: function () {
    var _this = this;
    app.wxRequest('GET', config.bannerUrl + 2, {}, function (res) {
      console.log(res);
      if (res.code == 200) {
        _this.setData({
          bannerList: res.banners
        })
      } else {
        wx.showModal({
          content: '网络加载失败...',
          showCancel: false
        })
      }
    })
  },
  //获取推荐歌单
  getPersonalized: function () {
    var _this = this;
    app.wxRequest('GET', config.personalizedUrl + '?limit=6', {}, function (res) {
      console.log(res);
      if (res.code == 200) {
        _this.setData({
          personalizedList: res.result
        })
      } else {
        wx.showModal({
          content: '网络加载失败...',
          showCancel: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getBanner();
    this.getPersonalized();
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