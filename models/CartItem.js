const mongoose = require('../db/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const Product = require('./Product');

const CartItemSchema = new Schema({
    productId: {type: Schema.Types.ObjectId, ref: 'Product'},
    sum: {type: String, required: true},
    totalPrice: {type: Number, required: true}
});

CartItemSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('CartItem', CartItemSchema);
