// 云函数入口文件
const cloud = require('wx-server-sdk')
const { genderSucData } = require("../utils/format");
cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('shop').doc(event.id)
      .update({
        data: {
          fulfill: true
        }
      });
    return genderSucData({});
  } catch (err) {
    return {
      code: 2000,
      message: 'Fulfill failed'
    }
  }
}