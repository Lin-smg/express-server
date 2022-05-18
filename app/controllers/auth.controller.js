const db = require("../models");
const User = db.User;
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const auth = require("../services/auth.service")

exports.login = (req, res, next) => {

    auth.login(req.body.userName, req.body.password)
        .then(data => {
            res.send(data)
        })
        .catch(next);
}

exports.authSchema = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}
