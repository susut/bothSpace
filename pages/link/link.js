// pages/link/link.js
import create from "../../store/create";
import store from '../../store/index'
import {UPDATE_USERINFO} from "../../constants/event";

create({
  data: {
    invitor: {},
    canConfirm: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInvitor()
  },
  getInvitor() {
    wx.showLoading()
    wx.cloud.callFunction({
      name: 'auth',
      data: {
        type: 'getPerson',
        openid: this.options.openid
      },
      success: ({ result }) => {
        const { code, data = {} } = result
        if (code === 0) {
          this.setData({
            invitor: data,
            canConfirm: true
          })
        }
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  link() {
    if (!store.storeView.login) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return
    }
    wx.showLoading()
    wx.cloud.callFunction({
      name: 'auth',
      data: {
        type: 'link',
        invitorOpenid: this.options.openid
      },
      success: ({ result }) => {
        const{ code, data, message } = result
        if (code === 0) {
          store.storeView.userInfo.linkId = data.linkId;
          create.emitter.emit(UPDATE_USERINFO, store.storeView.userInfo)
          wx.showToast({
            title: 'congratulation，you are together ~',
            icon: 'none'
          })
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }, 1500)
        } else {
          wx.showToast({
            title: message,
            icon: 'none'
          })
        }
      },
      complete() {
        wx.hideLoading()
      }
    })
  }
})