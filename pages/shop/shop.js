//index.js
import create from "../../store/create";
import store from '../../store/index';

create({
  data: {
    giftPosition: {
      me: [
        [300, 0],
        [370, 90],
        [360, 200],
        [130, 350],
        [230, 380],
        [530, 380],
        [310, 460],
        [220, 560],
        [420, 500],
        [480, 580],
        [260, 660],
        [400, 640],
        [180, 160],
      ],
      ta: [
        [260, 120],
        [460, 190],
        [230, 250],
        [330, 320],
        [440, 300],
        [400, 400],
        [170, 470],
        [100, 570],
        [320, 570],
        [520, 490],
        [590, 570],
        [160, 660],
        [550, 660],
        [340, 720],
      ]
    },
    giftListMe: [],
    giftListTa: [],
    curGift: {
      show: false,
      detail: {},
      canDone: false,
      canDelete: false
    },
    showShareModal: false,
  },
  onShow: function () {
    store.storeView.login && this.getList() 
  },
  getList() {
    wx.showLoading()
    wx.cloud.callFunction({
      name: 'shop',
      data: {
        type: 'list',
        id: store.storeView.userInfo.linkId,
        linkOpenid: store.storeView.linkInfo.openid || ''
      },
      success: ({ result }) => {
        wx.hideLoading()
        const { code, data } = result
        if (code === 0) {
          this.setData({
            giftListMe: data.me || [],
            giftListTa: data.ta || []
          })
        } else {
          wx.showToast({
            title: 'get failed',
            icon: 'none'
          })
        }
      },
      fail: err => {
        wx.hideLoading()
      }
    })
  },
  add() {
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
    wx.navigateTo({
      url: '/pages/shop/add/add'
    })
  },
  showGift(e) {
    const { index, type } = e.currentTarget.dataset
    this.setData({
      curGift: {
        show: true,
        detail: this.data['giftList' + type][index],
        canSubmit: Boolean(type === 'Me')
      }
    })
  },
  hideGift() {
    this.setData({
      'curGift.show': false
    })
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
  },
  copy() {
    wx.setClipboardData({
      data: this.data.curGift.detail.link
    })
  },
  fulfill() {
    wx.showLoading()
    wx.cloud.callFunction({
      name: 'shop',
      data: {
        type: 'fulfill',
        id: this.data.curGift.detail._id
      },
      success: ({ result }) => {
        wx.hideLoading()
        if (result.code === 0) {
          wx.showToast({
            title: 'Done',
            icon: 'none'
          })
          this.getList()
          this.hideGift()
        }
      },
      fail: () => {
        wx.hideLoading()
      }
    })
  },
  del() {
    wx.showLoading()
    wx.cloud.callFunction({
      name: 'shop',
      data: {
        type: 'del',
        id: this.data.curGift.detail._id
      },
      success: ({ result }) => {
        wx.hideLoading()
        if (result.code === 0) {
          wx.showToast({
            title: 'Done',
            icon: 'none'
          })
          this.getList()
          this.hideGift()
        }
      },
      fail: () => {
        wx.hideLoading()
      }
    })
  }
});
