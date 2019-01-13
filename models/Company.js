const mongoose = require('../db/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const Product = require('./Product');

const CompanySchema = new Schema({
    name: {type: String, required: true , unique: true},
    bio: {type: String, required: true },
    logo: {type: String, required: true},
    products: [{
        type: Schema.Types.ObjectId, ref: 'Product'
    }]
});

CompanySchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('Company', CompanySchema);
