const Datastore = require('nedb-promises');

const db = Datastore.create({ filename: './db/characters.db', autoload: true });

module.exports = db;