const getOpenId = require('./getOpenId/index')
const login = require('./login/index')
const getPerson = require('./getPerson/index')
const link = require('./link/index')
const getLinkInfo = require('./getLinkInfo/index')

exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
      return getOpenId.main(event, context)
    case 'login': 
      return await login.main(event, context)
    case 'getPerson':
      return await getPerson.main(event, context)
    case 'link':
      return await link.main(event, context)
    case 'getLinkInfo': 
      return await getLinkInfo.main(event, context)
  }
}