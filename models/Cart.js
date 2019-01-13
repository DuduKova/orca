const mongoose = require('../db/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const CartItem = require('./CartItem');

const CartSchema = new Schema({
    userId: {type: String, required: true , unique: true},
    items: [{
        type: Schema.Types.ObjectId, ref: 'CartItem'
    }]
});

CartSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('Cart', CartSchema);


