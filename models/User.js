const mongoose = require('../db/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const secretKey = 'dudukovalski';
const validator = require('validator');
const _ = require('lodash');

const UserSchema = new Schema({
    firstName: {type: String, required: true, max: 30, trim: true},
    lastName: {type: String, required: true, max: 30, trim: true},
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: [true, "can't be blank"],
        index: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {type: String, required: true, minlength: 6},
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    city: {type: String, trim: true, required: true},
    street: {type: String, trim: true, required: true},
    isAdmin: {type: Boolean, default: false, required: true}
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.generateAuthToken = function () {
    const access = 'auth';
    const token = jwt.sign({_id: this._id.toString('hex'), access}, secretKey).toString();
    this.tokens = this.tokens.concat([{access, token}]);

    return this.save().then(() => {
        return token;
    })
};

UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    return _.pick(userObject, ['_id', 'email', 'firstName', 'lastName', 'city', 'street']);
};

//
// UserSchema.methods.setPassword = function (password) {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };
//
// UserSchema.methods.validPassword = function (password) {
//     const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//     return this.hash === hash;
// };
//
// UserSchema.methods.generateJWT = function () {
//     const today = new Date();
//     const exp = new Date(today);
//     exp.setDate(today.getDate() + 60);
//
//     return jwt.sign({
//         id: this._id,
//         email: this.email,
//         exp: parseInt(exp.getTime() / 1000),
//     }, secretKey);
// };
//
// UserSchema.methods.toAuthJSON = function () {
//     return {
//         email: this.email,
//         token: this.generateJWT()
//     };
// };
//

UserSchema.statics.findByToken = function (token) {
    let decoded;
    try {
        decoded = jwt.verify(token, secretKey)
    } catch (e) {
        return Promise.reject();
    }
    return this.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
