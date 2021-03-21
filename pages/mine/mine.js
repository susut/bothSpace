//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
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
