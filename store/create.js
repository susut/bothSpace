import store from "./index";
import Emitter from "../utils/emitter";

const create = (options) => {
  options.data.storeView = store.storeView;
  options.data = options.data || {};
  options.oData = {
    _remainChangeView: {}
  }

  if (!store._isObserver) {
    store._isObserver = true; // 标记监听一次
    store.storeView = observer(JSON.parse(JSON.stringify(store.storeView)), 'storeView');
    // store.storeModel = observer(JSON.parse(JSON.stringify(store.storeModel)), 'storeModel');
  }

  const _onLoad = options.onLoad;
  options.onLoad = function (e) {
    options.data.storeView = JSON.parse(JSON.stringify(store.storeView));
    // options.data.storeModel = JSON.parse(JSON.stringify(store.storeModel));
    // 把storeView赋值给每一个页面data
    this.setData({
      storeView: options.data.storeView
    })
    _onLoad && _onLoad.call(this, e);
  }

  const _onShow = options.onShow;
  options.onShow = function (e) {
    // 未修改数据setData
    if (Object.keys(this.oData._remainChangeView).length) {
      const viewData = JSON.parse(JSON.stringify(this.oData._remainChangeView));
      this.setData(viewData);
    }
    this.oData._remainChangeView = {};
    _onShow && _onShow.call(this, e);
  }
  Page(options);
}

create.Component = function(options) {
  options.lifetimes = options.lifetimes || {};
  const _attached = options.attached || options.lifetimes.attached;
  options.attached = options.lifetimes.attached = function (e) {
    options.data = options.data || {};
    options.data.storeView = JSON.parse(JSON.stringify(store.storeView));
    this.setData({
      storeView: options.data.storeView
    });
    _attached && _attached.call(this, e);
  }
  Component(options);
}

const observer = (data, type) => {
  return _proxy(data, type);
}

const _proxy = (data, type) => {
  return new Proxy(data, {
    get: (obj, prop) => {
      const val = obj[prop];
      if (typeof val === 'object') {
        return _proxy(val, `${type}.${prop}`)
      } else {
        return obj[prop];
      }
    },
    set: (obj, prop, newVal) => {
      if (obj[prop] === newVal) return true;
      obj[prop] = newVal;
      const pages = getCurrentPages();
      const curPage = pages[pages.length - 1];
      let key;
      if (obj instanceof Array) { // 数组是对象   监听push的时候prop为数组下标   需要用 [] 而非 .
        key = `${type}[${prop}]`;
      } else {
        key = `${type}.${prop}`;
      }
      const value = JSON.parse(JSON.stringify(newVal))

      pages.forEach(page => {
        if (type.includes('storeView')) {
          if (page === curPage) {
            // 当前页直接修改
            curPage.setData({
              [key]: value
            })
          } else {
            // 其他页先记录起来，在onShow生命周期再setData
            page.oData?._remainChangeView || (page.oData = {_remainChangeView: {}});
            page.oData._remainChangeView[key] = value;
          }
        } else {
          // page.data.storeModel[prop] = value;
        }
      })
      return true;
    }
  })
}

create.emitter = new Emitter();

export default create;
