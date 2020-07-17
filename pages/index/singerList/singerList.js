const config = require("../../../config");
const app = getApp();

// pages/index/singerList/singerList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songerList: [], //歌手列表
  },


  /** 
   * 获取歌手信息
   */
  getSongers: function () {
    var _this = this;
    app.wxRequest('GET', config.songersUrl, {}, function (res) {
      console.log(res);
      if (res.code == 200) {
        _this.setData({
          songerList: res.list.artists
        })
      } else {
        wx.showModal({
          content: '网络加载失败',
          showCancel: false
        })
      }
    })
  },

  /** 
   * 跳转歌手歌曲
  */
 goSongList:function(e){
   console.log(e.currentTarget.dataset.name);
   wx.navigateTo({
     url: '/pages/index/songList/songList?word=' +  e.currentTarget.dataset.name,
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
    this.getSongers();
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