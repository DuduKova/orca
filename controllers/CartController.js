const {ObjectId} = require('mongoose').Types;
const Cart = require('./../models/Cart');
const _ = require('lodash');

class CartController {
    constructor () {};

    static getOne (req, res) {
        let id = req.params.id;

        if(!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Cart.findById(id).then((result) => {
            if(!result) {
                return res.status(404).send();
            }
            res.send(result);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };

    static getAll (req , res) {
        Cart.find({}, (err , company) => {
            if(err) {
                return res.send(err);
            }
            return res.send(company);
        })
    };

    static add (req , res) {
        const newCart = new Cart({
            userId: req.body.id,
        });

        newCart.save(function (err) {
            if (err) return console.log(err);
            return res.send('new cart was created');
        })
    };

    static update (req , res) {
        const id = req.params.id;
        const body = _.pick(req.body , ['logo','bio']);

        if(!ObjectId.isValid(id)) {
            return res.status(404).send();
        }
        Cart.findOneAndUpdate(id, {
            $set: body
        }, {new: true}).then((company) => {
            if(!company) {
                res.status(404).send();
            }

            res.send({company});

        }).catch((e) => {
            res.status(404).send(e);
        })
    };

    static removeOne (req,res) {
        let id = req.params.id;
        if(!ObjectId.isValid(id)) {
            return res.status(404).send();
        }

        Cart.findByIdAndRemove(id).then((result) => {
            if(!result) {
                return res.status(404).send();
            }
            res.send(result);
        }).catch((e) => {
            res.status(400).send(e);
        });
    };
}

module.exports = CartController;
