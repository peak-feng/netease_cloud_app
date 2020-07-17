// pages/player/player.js
const config = require('../../config.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    word: '',
    musicId: '',
    imgUrl: '',
    name: '',
    author: '',
    src: '',
    isPlay: true,
    show: true,
    showLyric: true,
    lyric: ''
  },


  /**
   * 获取歌曲
   */
  getSong: function () {
    var _this = this;
    app.wxRequest('GET', config.songUrl + _this.data.musicId, {}, function (res) {
      console.log(res);
      if (res.code == 200) {
        if (res.data[0].url === null) { //如果是MV 电台 广告 之类的就提示播放出错，并返回首页
          // console.log('播放出错')
          wx.showModal({
            content: '服务器开了点小差~~',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            showCancel: false,
            confirmText: '返回',
            complete() {
              wx.navigateBack({
                data: -1
              })
            }
          })
        } else {
          _this.setData({
            src: res.data[0].url
          })
          _this.createBgAudio();
        }
      } else {
        wx.showModal({
          content: '网络加载失败...',
          showCancel: false
        })
      }
    })
  },

  /** 
   * 获取歌曲封面
   */
  getcover: function () {
    var _this = this;
    app.wxRequest('GET', config.coverUrl + _this.data.musicId, {}, function (res) {
      console.log(res);
      if (res.code == 200) {
        _this.setData({
          imgUrl: res.songs[0].al.picUrl
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
   * 获取歌词
   */
  getLyric: function () {
    var _this = this;
    app.wxRequest('GET', config.lyricUrl + _this.data.musicId, {}, function (res) {
        console.log(res);
        if (res.code == 200) {
          _this.setData({
            lyric: res.lrc.lyric
          })
        }else{
        wx.showModal({
          content: '网络加载失败...',
          showCancel: false
        })
      }
    })
},
/**
 * 创建后台音频 
 */
createBgAudio(res) {
  const bgAudioManage = wx.getBackgroundAudioManager(); //获取全局唯一的背景音频管理器。并把它给实例bgAudioManage
  app.globalData.bgAudioManage = bgAudioManage; //把实例bgAudioManage(背景音频管理器) 给 全局
  bgAudioManage.title = this.data.name
  bgAudioManage.singer = this.data.author
  bgAudioManage.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
  bgAudioManage.src = this.data.src;
},

/** 
 * 播放和暂停
 */
// 播放和暂停
handleToggleBGAudio() {

  const bgAudioManage = app.globalData.bgAudioManage;
  const {
    isPlay
  } = this.data;
  if (isPlay) {
    bgAudioManage.pause();
  } else {
    bgAudioManage.play();
  }
  this.setData({
    isPlay: !isPlay
  })
},

// 点击切换歌词和封面
showLyric() {
  const {
    showLyric
  } = this.data;
  this.setData({
    showLyric: !showLyric
  })
},
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  this.setData({
    musicId: options.musicId,
    name: options.name,
    author: options.author,
  })
  this.getSong();
  this.getcover();
  this.getLyric();
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {
  this.audioCtx = wx.createAudioContext('myAudio');
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