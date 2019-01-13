const mongoose = require('../db/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    cartId: {type: String, required: true , unique: true},
    totalPrice: {type: String, required: true },
    city: {type: Number, required: true},
    street: {type: String , required: true},
    dateToDeliver: {type: String, required: true },
    dateOfOrder: {type: String, required: true},
    creditCard4digit: {type: Number, required: true }
});

OrderSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('Order', OrderSchema);
