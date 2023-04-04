// 云函数入口文件
const cloud = require('wx-server-sdk')
const { genderSucData } = require("../utils/format");
cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID: openid } = cloud.getWXContext()
  try {
    const data = { openid, ...event.shopData, fulfill: false };
    await db.collection('shop').add({ data });
    return genderSucData(data);
  } catch (err) {
    return {
      code: 2000,
      message: 'Add failed'
    }
  }
}