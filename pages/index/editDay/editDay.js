import create from "../../../store/create"
import store from "../../../store/index"

// pages/index/editDay/editDay.js
create({
  data: {
    type: 'add',
    remindTimeList: ['不提醒', '提前一天', '提前三天', '提前七天'],
    day: {
      title: '',
      desc: '',
      theDate: Math.floor(new Date().getTime() / 1000),
      isTop: false,
      remind: 0
    }
  },
  onLoad(options) {
    this.setData({ 
      type: options.type
    })
  },
  editTitle(e) {
    const { value = '' } = e.detail;
    this.setData({
      'day.title': value
    });
  },
  editDesc(e) {
    const { value = '' } = e.detail;
    this.setData({
      'day.desc': value
    });
  },
  editTheDay(e) {
    const { value } = e.detail;
    console.log(value)
    this.setData({
      'day.theDate': Math.floor(new Date(value).getTime() / 1000)
    });
  },
  editTop(e) {
    const { value } = e.detail;
    this.setData({
      'day.isTop': value
    })
  },
  editRemind(e) {
    const { value } = e.detail;
    this.setData({
      'day.remind': value
    })
  },
  add() {
    if (!this.data.day.title) {
      wx.showToast({
        title: 'Please enter the title ~',
        icon: 'none'
      })
      return;
    }
    wx.cloud.callFunction({
      name: 'day',
      data: {
        type: 'add',
        dayData: {
          linkId: store.storeView.userInfo.linkId,
          ...this.data.day
        }
      },
      success: res => {
        wx.showToast({
          title: 'Add success'
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      },
      fail: err => {
        wx.showToast({
          title: 'Add failed. Please try again later',
          icon: 'none'
        });
      }
    })
  },
  share() {},
  edit() {},
  alter() {}
})
