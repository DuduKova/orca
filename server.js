const express = require('express');
const bodyParser = require('body-parser');
const config = require('./db/config');
const jwt = require('jsonwebtoken');
const userController = require('./controllers/UserController');
const _ = require('lodash');
require('./models/User');

const app = express();

app.use(bodyParser.json());

//app.use(require('./routes'));

app.get('/', (req, res) => {
    res.send('HOME');
});

app.get('/users/:id', (req, res) => {
    userController.getOne(req, res);
});

app.get('/users', (req, res) => {
    userController.getAll(req, res);
});

app.post('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post created...',
                authData
            })
        }
    });
});

app.post('/users/add', (req, res) => {
   userController.add(req, res);
});

app.patch('/users/:id' , (req,res) => {
    userController.update(req,res);
});

// app.delete('/users/remove', (req, res) => {
//     userController.destroy(req, res);
// });

app.delete('/users/remove/:id', (req, res) => {
    userController.removeOne(req, res);
});

app.post('/login', (req, res) => {
    const user = {
        id: 1,
        username: 'david',
        email: 'dudu3459@gmail.com'
    };

    jwt.sign({user: user}, 'secretkey', {expiresIn: '1h'}, (err, token) => {
        res.json({
            token
        })
    });
});

// FORMAT TOKEN
// Authorization: Bearer <access_token>

function verifyToken(req, res, next) {
    // get auth header value
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== "undefined") {
        // split at the space
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;
        // next middleware
        next();
    } else {
        //forbidden
        res.sendStatus(403);
    }
}


app.listen(config.app.port, () => {
    console.log(`Server started on post: ${config.app.port}`);
});
