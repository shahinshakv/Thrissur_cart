const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); 

const FcmSchema = mongoose.Schema({
    _id: Number,
    token : {type :String, required : true},
    customerid: {type : Number, ref: "User", default : 0 },
    device_id: {type: String, default: "0"},
    device : {type : String},
    countryid : {type : Number, ref: "Country"},
  created_date : {type : Date, default : Date.now},
  updated_date : {type : Date, default : Date.now}

});

FcmSchema.plugin(AutoIncrement,{start_seq: 100, id: 'fcm_id', inc_field: '_id'});
module.exports = mongoose.model('Fcm', FcmSchema);