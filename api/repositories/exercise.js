const base = require('./base')

module.exports = (db) => base.repository(db.collection('exercises'))
