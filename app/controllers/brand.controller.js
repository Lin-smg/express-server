const db = require("../models");
const Category = db.categorys;
const Op = db.Sequelize.Op;
const brandService = require("../services/brand.service")
const imageHelper = require("../helper/imageHelper")

exports.create = async (req, res) => {
    let reqData = req.body;

    var file_name = new Date().getTime() + ".png";
    // const tempPath = path.join(__dirname, "../../" + req.file.path);
    // const targetPath = path.join(__dirname, "../../assets/images/brands/" + file_name);

    let data = JSON.parse(req.body.data);

    if (req.file) {
        imageHelper.saveImage("../../" + req.file.path, "../../assets/images/brands/" + file_name)
    } else {
        file_name = null
    }

    let brand = {
        name: reqData.name,
        image: file_name
    }

    let resultData = await brandService.addBrand(brand);

    if (resultData) {
        res.send({
            result: 0,
            data: resultData
        })
    } else {
        res.send({
            result: 1,
            message: 'create failed'
        })
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    let data = JSON.parse(req.body.data);

    var file_name = data.image ? data.image : new Date().getTime() + ".png";
    console.log(req.file)
    if (req.file) {
        imageHelper.saveImage("../../" + req.file.path, "../../assets/images/brands/" + file_name)
    } else {
        file_name = null
    }

    const brand = {
        name: data.name,
        image: file_name
    }

    let resultData = await brandService.updateBrand(brand, id)

    if (resultData == 1) {
        res.send({
            result: 0,
            message: "Brand was updated sucessfully"
        })
    } else {
        res.send({
            result: 1,
            message: `Cannot update Brand with id=${id}. Maybe Brand was not found or req.body is empty!`
        });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;

    let resultData = await brandService.delete(id);

    if (resultData == 1) {
        res.send({
            result: 0,
            message: "Brand was deleted successfully!"
        })
    } else {
        res.send({
            result: 1,
            message: `Cannot delete Brand with id=${id}. Maybe Brand was not found!`
        })
    }
}

exports.getAllBrand = async (req, res) => {
    let { data, count } = await brandService.getAllBrand();

    res.send({
        result: 0,
        count: count,
        data: data
    })
}