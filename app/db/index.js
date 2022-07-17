const moongose = require('mongoose');
const { urlDb } = require('../config');

moongose.connect(urlDb);

const db = moongose.connection;

module.exports = db