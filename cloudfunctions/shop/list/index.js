// 云函数入口文件
const cloud = require('wx-server-sdk')
const { genderSucData } = require("../utils/format");
cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID: selfOpenid } = cloud.getWXContext()
  try {
    const {data: res1} = await db.collection('shop')
      .where({openid: selfOpenid, fulfill: false})
      .get()
    let linkOpenId = event.linkId
    if (!linkOpenId) {
      const {data} = await db.collection('link').doc(event.id).get();
      const {invitorOpenid, openid} = data || {}
      linkOpenId = selfOpenid === openid ? invitorOpenid : openid
    }
    const {data: res2} = await db.collection('shop')
      .where({openid: linkOpenId, fulfill: false })
      .get()
    return genderSucData({
      me: res1,
      ta: res2
    })
  } catch (err) {
    debugger
    return {
      code: 2000,
      message: 'get failed'
    }
  }
}