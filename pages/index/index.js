//index.js

import create from "../../store/create";
import store from "../../store/index";

create({
  data: {
    topItem: {
      count: 0, title: '- - - -'
    },
    list: [],
    pageIndex: 1,
    pageSize: 10,
    showShareModal: false
  },
  onLoad() {
    store.storeView.userInfo.linkId && this.getList()
  },
  getList() {
    wx.showLoading()
    wx.cloud.callFunction({
      name: 'day',
      data: {
        type: 'list',
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        linkId: store.storeView.userInfo.linkId
      },
      success: ({ result }) => {
        const { code, data } = result
        if (code === 0) {
          data.forEach(val => {
            val.count = Math.ceil((new Date().getTime() / 1000 - val.theDate) / (60 * 60 *24))
          })
          const topItem = data.splice(0, 1)[0]
          this.setData({
            topItem,
            list: data
          })
        }
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  editDay(e) {
    if (!store.storeView.login) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return;
    }
    if (!store.storeView.userInfo.linkId) {
      this.setData({
        showShareModal: true
      })
      return;
    }
    const { type } = e.currentTarget.dataset
    if (!type) return;
    wx.navigateTo({
      url: '/pages/index/editDay/editDay?type=' + type
    });
  },
  onShareAppMessage() {
    return {
      title: `${store.storeView.userInfo.nickName} invite you`,
      path: '/pages/link/link?openid=' + store.storeView.userInfo.openid
    }
  },
  closeShareModal() {
    this.setData({
      showShareModal: false
    })
  }
});
