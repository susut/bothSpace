const cloud = require('wx-server-sdk')
cloud.init()
const { genderSucData } = require("../utils/format");
const db = cloud.database();

exports.main = async(event, context) => {
  try {
    const { data: res } = await db.collection('person').where({ openid: event.openid }).get();
    return genderSucData(res[0] || {});
  } catch (err) {
    return {
      code: 2000,
      message: 'get failed'
    }
  }
}