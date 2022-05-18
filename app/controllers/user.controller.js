const { sequelize } = require("../models");
const db = require("../models");

const express = require('express');
const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const authorize = require('../middleware/authorize')
const userService = require('../services/user.service');
const { func } = require("joi");
const fs = require("fs");
const path = require("path");
const imageHelper = require("../helper/imageHelper");

module.exports = {
    authenticateSchema,
    authenticate,
    registerSchema,
    register,
    getAll,
    getCurrent,
    getById,
    updateSchema,
    update,
    _delete,
    create,
    getImage,
    updateUser
}
function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        user_name: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(data => {
            res.send(data)
        })
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        user_name: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().required(),
        status: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then((data) => res.send(data))
        .catch(next);
}

async function create(req, res, next) {
    let data = JSON.parse(req.body.data);

    // var file_name = new Date().getTime() + ".png";
    var file_name = data.imgUrl ? data.imgUrl : new Date().getTime() + ".png";
    console.log(req.file)
    if (req.file) {
        imageHelper.saveImage("../../" + req.file.path, "../../assets/images/users/" + file_name)
    } else {
        file_name = null
    }
    // const tempPath = path.join(__dirname, "../../" + req.file.path);
    // const targetPath = path.join(__dirname, "../../assets/images/users/" + file_name);

    data.photo = file_name

    // fs.renameSync(tempPath, targetPath)

    let result = await userService.createUser(data)

    if (result) {
        res.send({
            result: 0,
            message: "successful",
            data: result
        })
    } else {
        res.send({
            result: 0,
            message: "add user failed"
        })
    }

}

async function updateUser(req, res) {
    const id = req.params.id;
    let data = JSON.parse(req.body.data);
    let user = userService.getUserByPK(id);
    if (user) {

        var file_name = null 

        // const tempPath = path.join(__dirname, "../../" + req.file.path);
        // const targetPath = path.join(__dirname, "../../assets/images/users/" + file_name);
        if (req.file) {
            file_name = data.imgUrl ? data.imgUrl : new Date().getTime() + ".png";

            imageHelper.saveImage("../../" + req.file.path, "../../assets/images/users/" + file_name)
        }

        data.photo = file_name

        // let filePath = path.join(__dirname, "../../assets/images/users/" + user.photo)
        // fs.unlinkSync(filePath)

        let result = await userService.update(id, data)
        //     .then(result => {
        //     res.send(result)
        // }).catch(next)
        if (result == 1) {
            res.send({
                result: 0,
                message: "User was updated successfully."
            });
        } else {
            res.send({
                result: 1,
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
            })
        }


    } else {
        res.send({
            result: 1,
            message: "user not found"
        })
    }
    // fs.unlinkSync(filePath)
}

function getImage(req, res) {
    console.log(req.query)
    res.sendFile(path.join(__dirname, "../../assets/images/users/" + req.query.image));

}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        user_name: Joi.string().empty(''),
        email: Joi.string().empty(''),
        // password: Joi.string().min(6).empty(''),
        photo: Joi.string().empty(''),
        role: Joi.string().empty(''),
        status: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}

async function update(req, res, next) {
    let result = await userService.update(req.params.id, req.body, res);
    // res.send(result)
    // .then(user => {
    //     res.send(user)
    // })
    // .catch(next);

    // res.send(result)
}

async function _delete(req, res, next) {
    let result = await userService.delete(req.params.id);

    if (result == 1) {
        res.send({
            result: 0,
            message: "User was deleted successfully!"
        })
    } else {
        res.send({
            result: 1,
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
        })
    }

}