const add = require('./add/index')
const list = require('./list/index')
const del = require('./delete/index')
const fulfill = require('./fulfill/index')

exports.main = async (event, context) => {
  switch (event.type) {
    case 'add':
      return add.main(event, context)
    case 'list':
      return list.main(event, context)
    case 'del':
      return del.main(event, context)
    case 'fulfill':
      return fulfill.main(event, context)
  }
}