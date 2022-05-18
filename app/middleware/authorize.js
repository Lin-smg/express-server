const jwt = require('express-jwt');
const { secret } = require('../config/config.json');
// const db = require('_helpers/db');
const db = require("../models");

module.exports = authorize;

function authorize() {
    // console.log("rrr")
    return [
        // authenticate JWT token and attach decoded token to request as req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            // get user with id from token 'sub' (subject) property
            const user = await db.User.findByPk(req.user.sub);
            console.log('user sub', req.user)

            // check user still exists
            if (!user)
                return res.status(200).json({ message: 'Unauthorized' + req.user.sub });

            // authorization successful
            req.user = user.get();
            next();
        }
    ];
}