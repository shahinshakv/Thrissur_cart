const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); 
const brandSchema = mongoose.Schema({
  category_id: {type : Number, ref: "Category", required : true },
  brand_name : {type : String, required : true },
  image: {type : String, required : true },
  priority: {type : Number, default : 1},
  status: {type : Number, default : 1},
  created_by: {type : String, default : 'admin'},
  updated_by: {type : String, default : 'admin'},
  created_date: {type : Date, default : Date.now},
  updated_date: {type : Date, default : Date.now}
});
module.exports = mongoose.model('Brand', brandSchema);
