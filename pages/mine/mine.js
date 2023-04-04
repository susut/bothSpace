//logs.js
import create from "../../store/create";
import store from '../../store/index';

create({
  data: {
  },
  onLoad () {
    if (this.toLogin()) return
    this.getLinkInfo()
  },
  onShow() {
  },
  getLinkInfo() {
    if (!store.storeView.userInfo.linkId) return
    wx.showLoading()
    wx.cloud.callFunction({
      name: 'auth',
      data: {
        type: 'getLinkInfo',
        id: store.storeView.userInfo.linkId
      },
      success: ({ result }) => {
        const { code, data } = result
        console.log(result)
        if (code === 0) {
          store.storeView.linkInfo = data
        }
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  toLogin() {
    if (!store.storeView.login) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return true
    }
    return false
  }
})
