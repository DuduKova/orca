const mongoose = require('../db/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const secretKey = 'DuduKova';

const UserSchema = new Schema({
    firstName: {type: String, required: true, max: 20, trim: true},
    lastName: {type: String, required: true, max: 20, trim: true},
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    password: {type: String, required: true, max: 40},
    city: {type: String, required: true},
    street: {type: String, required: true},
    role: {type: String, required: true}
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this.id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000),
    }, secretKey);
};

UserSchema.methods.toAuthJSON = function () {
    return {
        email: this.email,
        token: this.generateJWT()
    };
};

// Export the model
const User = mongoose.model('User', UserSchema);

module.exports = User;
