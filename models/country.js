const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); 

const countrySchema = mongoose.Schema({
    _id: Number,
    country_name : {type :String, required : true},
    country_code : {type :String, required : true},
    image : {type :String, required : true},
    minimum_order : {type :Number, required : true},
    currency : {type :String, required : true},
    vat:{type :Number, required : true},
    priority : {type : Number, default : 1},
  status : {type : Number, default : 1},
  created_by : {type : String, default : 'admin'},
  updated_by : {type : String, default : 'admin'},
  created_date : {type : Date, default : Date.now},
  updated_date : {type : Date, default : Date.now}

});

countrySchema.plugin(AutoIncrement,{start_seq: 100, id: 'country_id', inc_field: '_id'});
module.exports = mongoose.model('Country', countrySchema);