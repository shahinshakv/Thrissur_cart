const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); 
const brandSchema = mongoose.Schema({
  _id: Number,
  category_id: {type : mongoose.Schema.Types.ObjectId, ref: "Category", required : true },
  brand_name : {type : String, required : true },
  brand_image: {type : String, required : true },
  priority: {type : Number, default : 1},
  status: {type : Number, default : 1},
  created_by: {type : String, default : 'admin'},
  updated_by: {type : String, default : 'admin'},
  created_date: {type : Date, default : Date.now},
  updated_date: {type : Date, default : Date.now}
});
brandSchema.plugin(AutoIncrement,{start_seq: 100});
module.exports = mongoose.model('Brand', brandSchema);
