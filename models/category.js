const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  category_name : {type : String, required : true },
  category_image: {type : String, required : true },
  priority: {type : Number, default : 1},
  status: {type : Number, default : 1},
  created_by: {type : String, default : 'admin'},
  updated_by: {type : String, default : 'admin'},
  created_date: {type : Date, default : Date.now},
  updated_date: {type : Date, default : Date.now}
  //creator: {type : mongoose.Schema.Types.ObjectId, ref: "User", required : true }
});

module.exports = mongoose.model('Category', categorySchema);
