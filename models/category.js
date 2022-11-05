const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); 
const categorySchema = mongoose.Schema({
  _id: Number,
  category_name : {type : String, required : true },
  image: {type : String, required : true },
  priority: {type : Number, default : 1},
  status: {type : Number, default : 1},
  created_by: {type : String, default : 'admin'},
  updated_by: {type : String, default : 'admin'},
  created_date: {type : Date, default : Date.now},
  updated_date: {type : Date, default : Date.now}
  //creator: {type : mongoose.Schema.Types.ObjectId, ref: "User", required : true }
});
categorySchema.plugin(AutoIncrement,{start_seq: 100});
module.exports = mongoose.model('Category', categorySchema);
