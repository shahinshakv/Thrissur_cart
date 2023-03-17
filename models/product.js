const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); 
const productSchema = mongoose.Schema({
  _id: Number,
  category_id: {type : Number, ref: "Category", required : true },
  category_name: {type: String, required : true},
  brand_id: {type : Number, ref: "Brand", required : true },
  brand_name: {type : String, required: true},
  product_name : {type : String, required : true },
  image : {type : String, required : true },
  packing : {type : String, required : true},
  netsuite_id : {type : String, required : true},
  price : {type : String, required : true},
  size : {type : String, required : true},
  quantity : {type : Number, required : true},
  description : {type : String, required : true},
  priority : {type : Number, default : 1},
  status : {type : Number, default : 1},
  created_by : {type : String, default : 'admin'},
  updated_by : {type : String, default : 'admin'},
  created_date : {type : Date},
  updated_date : {type : Date, default : Date.now}
});
productSchema.plugin(AutoIncrement,{start_seq: 100, id: 'product_id', inc_field: '_id'});
module.exports = mongoose.model('Product', productSchema);
