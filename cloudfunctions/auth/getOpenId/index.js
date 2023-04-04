const cloud = require('wx-server-sdk')
cloud.init()

exports.main = () => {
  const {OPENID, APPID, UNIONID} = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的

  return {
    openid: OPENID,
    appId: APPID,
    unionid: UNIONID
  }
}