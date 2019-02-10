const express = require('express');
const companiesRouter = express.Router();
const cartItemsRouter = require('./cartItems');
const cartController = require('../controllers/CartController');

// middleware that is specific to this router

companiesRouter.use('/:id/cartitems', cartItemsRouter);

companiesRouter.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();

    companiesRouter.get('/', (req, res) => cartController.getAll(req, res));

    companiesRouter.get('/:id', (req, res) => cartController.getOne(req, res));

    companiesRouter.post('/add', (req, res) => cartController.add(req, res));

    companiesRouter.patch('/:id', (req, res) => cartController.update(req, res));

    companiesRouter.delete('/remove/:id', (req, res) => cartController.removeOne(req, res));
});

module.exports = companiesRouter;
