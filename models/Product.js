const mongoose = require('../db/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {type: String, required: true , unique: true},
    price: {type: Number, required: true},
    image: {type: String , required: true}
});

ProductSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('Product', ProductSchema);
