const add = require('./add/index')
const list = require('./list/index')

exports.main = async (event, context) => {
  switch (event.type) {
    case 'add':
      return add.main(event, context)
    case 'list':
      return list.main(event, context)
  }
}