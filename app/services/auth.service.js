const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require("../models");
const User = db.User

exports.login = async (user_name, password) => {
    const user = await User.findOne({ where: { user_name } });

    if (!user || !(await bcrypt.compare(password, user.password))) {

        return {
            result: 1,
            data: 'Username or password is incorrect'
        }
    }

    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        result: 0,
        data: { ...(user.get()), token }
    };
}