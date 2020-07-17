const config = require("../../../config")
const app = getApp();
// pages/mv/mvPlayer/mvPlayer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvid:'10928277',
    mvPlayer:'',
    mvurl:'',
  },


  getMVPlayer:function(){
    var _this = this;
    app.wxRequest('GET',config.mvUrl + '/url?id=' + _this.data.mvid,{},function(res){
      console.log(res);
      if(res.code ==200){
        _this.setData({
          mvurl:res.data.url
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.mvid){
      this.setData({
        mvid:options.mvid
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getMVPlayer();
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