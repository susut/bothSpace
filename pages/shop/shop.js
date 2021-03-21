//index.js
//获取应用实例
const app = getApp();
import { itemMap, categoryList} from '../../utils/data';

Page({
  data: {
    motto: 'aaa',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    categoryList,
    curCategoryIndex: 0, // 默认选中第一个
    curItemList: itemMap[categoryList[0].key]
  },
  onLoad: function () {
  },
  changeCategory: function (e) {
    const { index = 0 } = e.currentTarget.dataset;
    const itemItemList = itemMap[categoryList[index].key];
    this.setData({
      curCategoryIndex: index,
      curItemList: itemItemList
    });
  },
  addToCart: function (e) {
    const { item = {} } = e.currentTarget.dataset;
    const { cartList = [] } = app.globalData;
    let has = false;
    cartList.forEach(li => {
      if (!has && item.id === li.id) {
        li.buyNum++;
        has = true;
      }
    });
    if (!has) {
      let copyItem = { ...item };
      copyItem.buyNum = 1;
      cartList.push(copyItem);
    }
    app.globalData.cartList = [...cartList];
    wx.setTabBarBadge({
      index: 1,
      text: `${cartList.length}`
    });
  }
});
