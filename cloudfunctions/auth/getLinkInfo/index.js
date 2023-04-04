const cloud = require('wx-server-sdk')
const { genderSucData } = require("../utils/format");
cloud.init()
const db = cloud.database();

exports.main = async(event, context) => {
  const { OPENID: selfOpenid } = cloud.getWXContext()
  try {
    const { data } = await db.collection('link').doc(event.id).get();
    const { invitorOpenid, openid } = data || {}
    const linkOpenid = selfOpenid === openid ? invitorOpenid : openid
    const { data: res } = await db.collection('person').where({ openid: linkOpenid }).get();
    return genderSucData(res[0] || {});
  } catch (err) {
    console.log(err)
    return {
      code: 2000,
      message: 'get failed'
    }
  }
}