// pages/search/search.js
const config = require('../../config.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: '', //input输入
    resultList: [] //列表
  },

  //input监听 
  inputChange: function (e) {
    this.data.word = e.detail.value;
  },

  /**
   * 搜索
   */
  search: function () {
    var _this = this;
    if (!_this.data.word) {
      wx.showModal({
        content: '请填写搜索内容',
        showCancel: false
      })
      return;
    }
    app.wxRequest('GET', config.searchUrl + _this.data.word, {
      limit: 30
    }, function (res) {
      console.log(res);
      if (res.code == 200) {
        _this.setData({
          resultList: res.result.songs
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
   * 播放歌曲
   */
  player: function (e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/player/player?musicId=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name + '&author=' + e.currentTarget.dataset.author
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