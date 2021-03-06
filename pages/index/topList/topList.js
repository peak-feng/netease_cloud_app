const config = require("../../../config");
const app = getApp();
// pages/index/topList/topList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topList: [], //榜单列表
  },

  /** 
   * 获取榜单
   */
  getTopList: function () {
    var _this = this;
    app.wxRequest('GET', config.topListUrl, {}, function (res) {
      console.log(res);
      if(res.code == 200){
        _this.setData({
          topList:res.list
        })
      }else{
        wx.showModal({
          content: '网络加载失败',
          showCancel:false
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
    this.getTopList();
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