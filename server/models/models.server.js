const mongoose = require('mongoose');
// const db = mongoose.connect('mongodb://localhost:27017/webProject');
// this is heroku db connection
const db = mongoose.connect('mongodb://project:123456@ds143099.mlab.com:43099/heroku_6jcttvlr');

module.exports = db;
