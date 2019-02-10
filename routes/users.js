const {authenticate} = require('../middleware/authenticate');
const express = require('express');
const usersRouter = express.Router();
const userController = require('../controllers/UserController');

// middleware that is specific to this router
usersRouter.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();

    usersRouter.get('/', (req, res) => userController.getAll(req, res));

    usersRouter.get('/me' , authenticate, (req, res) => userController.getMe(req , res));

    usersRouter.delete('/me/token' , authenticate, (req, res) => userController.logout(req , res));

    usersRouter.get('/:id', (req, res) => userController.getOne(req, res));

    usersRouter.post('/login', (req, res) => userController.login(req, res));

    usersRouter.post('/add', (req, res) => userController.add(req, res));

    usersRouter.patch('/:id', (req, res) => userController.update(req, res));

    usersRouter.delete('/remove/:id', (req, res) => userController.removeOne(req, res));
});

module.exports = usersRouter;
