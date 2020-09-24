//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    test: {
      test: 1
    }
  },
  onLoad: function () {
    console.log(this.data.test.test)
    setTimeout(() => {
      this.setData({
        'test.test': 2
      })
      console.log(this.data.test.test)
    }, 2000)
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  jumpTo() {
    wx.miniProgram.navigateTo({url: 'https://www.baidu.com'});
  },
  subscribeMsg() {
    wx.requestSubscribeMessage({
      tmplIds: ['Mpja72d0M6G_vsti7mUVWqiWsC-Z0dIlJncgEgqFQa8', 'VPL_16JzVBlHpu6aSCI22l0zTvYSWoaREDK-m0Ji63A'],
      success (res) {
        console.log(res);
      }
    })
  }
})
