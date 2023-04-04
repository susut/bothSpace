import create from "./create";
import { UPDATE_USERINFO } from "../constants/event";
import store from './index';

export default function initStore() {
  create.emitter.on(UPDATE_USERINFO, userInfo => {
    store.storeView.userInfo = userInfo;
    store.storeView.login = !!userInfo?.openid;
    wx.setStorageSync('userInfo', userInfo);
  })
  
  const userInfo = wx.getStorageSync('userInfo') || {}
  create.emitter.emit(UPDATE_USERINFO, userInfo);
}