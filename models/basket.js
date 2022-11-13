const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); 
const Schema = mongoose.Schema;

const BasketSchema = new Schema({
    _id: Number,
    basket_name: {type : String, required : true },
    products: [{
        item: [{ type: Number,
            ref: "Product"}],
        quantity: [{  type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.']}],
    }],
    subtotal: {
        default: 0,
        type: Number
    },
    image: {type : String, required : true },
    priority: {type : Number, default : 1},
    status: {type : Number, default : 1},
    created_by: {type : String, default : 'admin'},
    updated_by: {type : String, default : 'admin'},
    created_date: {type : Date, default : Date.now},
    updated_date: {type : Date, default : Date.now}
})
BasketSchema.plugin(AutoIncrement,{start_seq: 100, id: 'basket_id', inc_field: '_id'});
module.exports = mongoose.model('Basket', BasketSchema);