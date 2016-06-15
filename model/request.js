var mongoose = require( 'mongoose' );

var schema = new mongoose.Schema({
  data: String,
});

module.exports = mongoose.model('request', schema);