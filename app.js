//app.js
var config = require('config.js');

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
    /**
   * 封装wx.request请求
   * method：请求方式，GET、HEAD、POST、PUT、DELETE
   * url:    请求地址
   * data：  要传递的参数
   * callback：请求成功回调函数
   * errFun：  请求失败回调函数
   * completeCallBack: 请求完成回调函数
   **/
  wxRequest(method, url, data, callback, errFun, completeCallBack) {
    var self = this;
    var token = wx.getStorageSync('token');
    //console.log('wxRequest token :' + token);

    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        // 'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'content-type': 'application/json',
        'Authorization': token,
        'Accept': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        //console.log('wxRequest success', res)
        //服务端验证token失败或过期则删除本地token，并重新登录
        if (res && res.statusCode == 403) {
          console.log('403...');
          wx.removeStorageSync('token');
          wx.removeStorageSync('tokenCreateTime');
          self.wxLogin();
        } else if (res && res.statusCode == 503) {
          if (!self.isExceedLoad) {
            wx.navigateTo({
              url: '/pages/page/index/errorPage/errorPage',
            })
          }
        }
        if (callback) {
          callback(res.data);
        }
      },
      fail: function (err) {
        //如果状态为 403则需要删除token，并重新登录
        console.log('wxRequest fail', err)
        if (errFun) {
          errFun(err);
        }
      },
      complete: function () {
        if (completeCallBack) {
          completeCallBack();
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    songId:[],
    songImg:[],
    waitForPlaying:[],
    songName:[]
  }
})