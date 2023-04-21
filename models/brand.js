const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); 
const brandSchema = mongoose.Schema({
  _id: Number,
  brand_name : {type : String, required : true },
  image: {type : String, required : true },
  priority: {type : Number, default : 1},
  status: {type : Number, default : 1},
  created_by: {type : String, default : 'admin'},
  updated_by: {type : String, default : 'admin'},
  created_date: {type : Date, default : Date.now},
  updated_date: {type : Date, default : Date.now}
});
brandSchema.plugin(AutoIncrement,{start_seq: 100, id: 'brand_id', inc_field: '_id'});
module.exports = mongoose.model('Brand', brandSchema);
