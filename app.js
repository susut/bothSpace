import initStore from "./store/mutation";
//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    // 初始store
    initStore();
  },
  globalData: {
    userInfo: null,
    cartList: [] // 购物车列表
  }
})
