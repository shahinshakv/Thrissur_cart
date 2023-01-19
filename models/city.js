const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); 

const citySchema = mongoose.Schema({
    _id: Number,
    city_name : {type :String, required : true},
    country_id: {type : Number, ref: "Country", required : true },
    country_name: {type: String, required : true},
    priority : {type : Number, default : 1},
  status : {type : Number, default : 1},
  created_by : {type : String, default : 'admin'},
  updated_by : {type : String, default : 'admin'},
  created_date : {type : Date, default : Date.now},
  updated_date : {type : Date, default : Date.now}

});

citySchema.plugin(AutoIncrement,{start_seq: 100, id: 'city_id', inc_field: '_id'});
module.exports = mongoose.model('City', citySchema);