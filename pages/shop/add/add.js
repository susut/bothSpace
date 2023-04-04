// pages/shop/add/add.js
Page({
  data: {
    imgPath: '/assets/image/empty-pic.png',
    title: '',
    link: ''
  },
  onLoad(options) {
    
  },
  selectImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: ({ tempFilePaths }) => {
        this.setData({
          imgPath: tempFilePaths
        })
      }
    })
  },
  inputTitle(e) {
    const { value } = e.detail || {}
    this.setData({
      title: value
    })
  },
  inputLink(e) {
    const { value } = e.detail || {}
    this.setData({
      link: value
    })
  },
  add() {
    wx.showLoading()
    const { imgPath, title, link } = this.data
    wx.cloud.callFunction({
      name: 'shop',
      data: {
        type: 'add',
        shopData: {
          imgPath: '', // todo
          title,
          link
        }
      },
      fail: (err) => {
        console.log(err)
        wx.showToast({
          title: 'Add failed.',
          icon: 'none'
        });
      },
      success: ({ result }) => {
        const { code } = result || {}
        if (code !== 0) {
          wx.showToast({
            title: 'Add failed.',
            icon: 'none'
          });
          return
        }
        wx.showToast({
          title: 'Add successfully',
          icon: 'none'
        });
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    })
  }
})