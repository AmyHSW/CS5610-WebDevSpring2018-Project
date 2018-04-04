const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/webProject');
// this is heroku db connection
// const db = mongoose.connect('mongodb://<user>:<password>@ds263707.mlab.com:63707/heroku_mwrl8mdn');

module.exports = db;
