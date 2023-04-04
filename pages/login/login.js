import create from "../../store/create";
import {UPDATE_USERINFO} from "../../constants/event";

// pages/login/login.js
create({
  data: {
    canIUseGetUserProfile: false,
  },
  onLoad() {
    this.setData({
      canIUseGetUserProfile: !!wx.getUserProfile
    })
  },
  login(userInfo) {
    wx.showLoading()
    wx.cloud.callFunction({
      name: 'auth',
      data: {
        type: 'login',
        userInfo
      },
      success: ({ result }) => {
        wx.hideLoading()
        const { code, data } = result
        if (code === 0) {
          create.emitter.emit(UPDATE_USERINFO, data);
          this.back();
        } else {
          wx.showToast({
            title: 'oh god, login failed',
            icon: 'none'
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: 'oh goo, login failed',
          icon: 'none'
        })
      }
    })
  },
  getUserProfile() {
    wx.getUserProfile({
      desc: 'improving the user information',
      success: ({ userInfo }) => {
        this.login(userInfo)
      }
    })
  },
  getUserInfo(e) {
    const { userInfo } = e.detail;
    this.login(userInfo)
  },
  back() {
    // 刷新上一页页面
    const pages = getCurrentPages();
    const prePage = pages[pages.length - 2];
    if (!prePage) return;
    prePage.onLoad(prePage.options);

    wx.navigateBack();
  }
})