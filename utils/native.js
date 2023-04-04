
// 跳转登录页
function navigateToLogin() {
  const pages = getCurrentPages();
  const curPages = pages[pages.length - 1];
  const { route = '' } = curPages;
  const url = '/pages/login/login';
  if (!url.includes(route)) {
    wx.navigateTo({
      url
    });
  }
}

export default {
  navigateToLogin
}