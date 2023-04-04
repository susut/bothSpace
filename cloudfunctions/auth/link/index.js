const cloud = require('wx-server-sdk')
cloud.init()
const { genderSucData } = require("../utils/format");
const db = cloud.database();

exports.main = async (event) => {
  const {OPENID: openid } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
  const { invitorOpenid } = event;
  try {
    const { data: invitorArr } = await db.collection('person').where({ openid: invitorOpenid }).get()
    const { data: selfArr } = await db.collection('person').where({ openid }).get()
    if ((invitorArr && invitorArr[0].linkId) || (selfArr && selfArr[0].linkId)) {
      return {
        code: 2000,
        message: 'already has their space.'
      }
    } else {
      const { linkId } = await db.runTransaction(async transaction => {
        const { _id: linkId } = await transaction.collection('link').add({
          data: {
            openid,
            invitorOpenid
          }
        })
        await transaction.collection('person')
          .where({ openid: invitorOpenid })
          .update({
            data: {
              linkId
            }
          })
        await transaction.collection('person')
          .where({ openid })
          .update({
            data: {
              linkId
            }
          })
        return {
          linkId
        }
      })
      return genderSucData({
        linkId
      })
    }
  } catch (err) {
    return {
      code: 2001,
      message: 'link failed, please try later again ~'
    }
  }
}