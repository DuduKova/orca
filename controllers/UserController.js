const {ObjectId} = require('mongoose').Types;
const mongoose = require('../db/mongoose');
const User = require('./../models/User');
const _ = require('lodash');
mongoose.Promise = global.Promise;

class UserController {
    constructor () {};

    static getOne (req, res) {
        let id = req.params.id;

        console.log(id);

        if(!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        User.findById(id).then((result) => {
            if(!result) {
                return res.status(404).send();
            }
            console.log(result);
            res.send(result);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };

    static getAll (req , res) {
        User.find({}, (err , users) => {
            if(err) {
                return res.send(err);
            }
            return res.send(users);
        })
    };

    static add (req , res) {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city,
            street: req.body.street,
            role: req.body.role
        });

        newUser.save(function (err) {
            if (err) return console.log(err);
            return res.send('new user was created');
        })
    };

    static update (req , res) {
        const id = req.params.id;
        const body = _.pick(req.body , ['firstName','lastName','email','password','city','street']);

        if(!ObjectId.isValid(id)) {
            return res.status(404).send();
        }
        User.findByIdAndUpdate(id, {
            $set: body
        }, {new: true}).then((user) => {
            if(!user) {
                res.status(404).send();
            }

            res.send({user});

        }).catch((e) => {
            res.status(404).send();
        })
    };

    static delete (req , res) {
        User.remove({}).then((result) => {
           console.log(result);
           res.send('all users deleted');
        });
    };

    static removeOne (req,res) {
        let id = req.params.id;

        console.log(id);

        if(!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        User.findByIdAndRemove(id).then((result) => {
            if(!result) {
                return res.status(404).send();
            }
            res.send(result);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };
}

module.exports = UserController;
