const config = require("../../../config");
const app = getApp();
// pages/index/recommendMv/recommendMv.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvList: [], //mv列表
  },

  //获取mv列表
  getMvList: function () {
    var _this = this;
    app.wxRequest('GET', config.mvUrl + '/first', {
      limit:16
    }, function (res) {
      console.log(res);
      if(res.code == 200){
        _this.setData({
          mvList:res.data
        })
      }else{
        wx.showModal({
          content: '网络加载失败',
        })
      }
    })
  },

  //mv播放
  handlePlayMv:function(e){
    wx.navigateTo({
      url: '/pages/mv/mvPlayer/mvPlayer?mvid=' +e.currentTarget.dataset.id,
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
    this.getMvList();
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