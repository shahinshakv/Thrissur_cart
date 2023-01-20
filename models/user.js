const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose); 

const userSchema = mongoose.Schema({
  _id: Number,
  name: {type : String, required : true},
  mobile: {type : Number, required : true, unique: true},
  email : {type : String, required : true, unique: true },
  password: {type : String, required : true },
  flat: {type: String, required : true },
  address: {type: String, required : true },
  city_id: {type : Number, ref: "City", required : true },
  city_name: {type: String, required : true},
  fcm_token: String,
  latitude: {type: String, required : true},
  longitude: {type: String, required : true},
  country_id: {type : Number, ref: "Country", required : true },
  country_name: {type: String, required : true},
  device: {type: String, required: true},
  device_id: {type: String, required: true, default: 'web'},
    status : {type : Number, default : 1},
    created_by : {type : String, default : 'admin'},
    updated_by : {type : String, default : 'admin'},
    created_date : {type : Date, default : Date.now},
    updated_date : {type : Date, default : Date.now}

});

userSchema.plugin(uniqueValidator);
userSchema.plugin(AutoIncrement,{start_seq: 100, id: 'user_id', inc_field: '_id'});
module.exports = mongoose.model('User', userSchema);
