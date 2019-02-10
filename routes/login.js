const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const _ = require('lodash');

router.get('/login', (req, res) => {
    res.send('HOME');
});

router.get('/logout', (req, res) => {
    res.send('logout');
});

router.post('/', verifyToken, (req, res) => {
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

router.post('/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const uset = new User({

    })

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

module.exports = router;
