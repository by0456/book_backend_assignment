const { mongoose } = require('mongoose');

const { User } = require('../db/models');

const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    let token = req.header('x-access-token');

    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            res.status(401).send(err);
        } else {
            req.user_id = decoded._id;
            next();
        }
    });
}