const cloud = require('wx-server-sdk')
const { genderSucData } = require('../utils/format')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
  const {OPENID: openid} = cloud.getWXContext()

  try {
    const { data: res } = await db.collection('person').where({
      openid
    }).get()
    if (res && res.length) { // 用户存在
      return genderSucData({ openid, ...res[0] })
    } else { // 注册用户
      const data = { openid, ...event.userInfo }
      await db.collection('person').add({
        data
      })
      return genderSucData(data)
    }
  } catch (err) {
    return {
      code: 1000,
      message: 'Login failed'
    }
  }
  
}