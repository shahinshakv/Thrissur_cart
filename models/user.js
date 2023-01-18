const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
  email : {type : String, required : true, unique: true },
  password: {type : String, required : true },
  name: {type : String, required : true},
  flat: {type: String, required : true },
  address: {type: String, required : true },
  city: {type: String, required : true},
  latitude: {type: String, required : true},
  longitute: {type: String, required : true},
  country: {type: String, required : true},


});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
