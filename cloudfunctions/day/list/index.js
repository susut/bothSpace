// 云函数入口文件
const cloud = require('wx-server-sdk')
const { genderSucData } = require("../utils/format");
cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { pageSize = 20, pageIndex = 1, linkId } = event;
  try {
    const { data: res } = await db.collection('day')
      .where({linkId })
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize)
      .orderBy('isTop', 'desc')
      .orderBy('theDate', 'desc')
      .get()
    return genderSucData(res || []);
  } catch (err) {
    return {
      code: 2000,
      message: 'View failed'
    }
  }
}