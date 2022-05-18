const db = require("../models");
const MainCategory = db.mainCategory;
const SubCategory = db.subCategory
const Product = db.products
const Op = db.Sequelize.Op;
const categoryService = require("../services/category.service")
const productService = require("../services/product.service")

exports.createMainCategory = async (req, res) => {
    // if (!req.body.title) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a MainCategory
    const mainCategory = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status ? req.body.status : false
    };

    // Save MainCategory in the database
    let data = await categoryService.createMainCategory(mainCategory);

    if (data) {
        res.send({
            result: 0,
            data: data
        })
    } else {
        res.send({
            result: 1,
            message: 'create failed'
        })
    }

};

exports.createSubCategory = async (req, res) => {

    // Create a MainCategory
    const subCategory = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status ? req.body.status : false,
        parent_id: req.body.parent_id
    };

    // Save MainCategory in the database
    let data = await categoryService.createSubCategory(subCategory);
    if (data) {
        res.send({
            result: 0,
            data: data
        })
    } else {
        res.send({
            result: 1,
            message: 'create failed'
        })
    }
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    MainCategory.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.getAllMainCategory = async (req, res) => {

    let { data, count } = await categoryService.getAllMainCategory();

    res.json({
        result: 0,
        count: count,
        data: data
    })

    // MainCategory.findAll()
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     });
};

exports.getAllSubCategory = async (req, res) => {

    let { data, count } = await categoryService.getAllSubCategory();

    res.json({
        result: 0,
        count: count,
        data: data
    })


    // MainCategory.hasMany(SubCategory, { foreignKey: 'parent_id' })
    // SubCategory.belongsTo(MainCategory, { foreignKey: 'parent_id' })

    // SubCategory.findAll({ where: {}, include: [MainCategory] })
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     });
};

exports.getAllMainSubCategory = async (req, res) => {

    let { data, count } = await categoryService.getAllMainSubCategory();

    res.json({
        result: 0,
        count: count,
        data: data
    })

    // MainCategory.hasMany(SubCategory, { foreignKey: 'parent_id' })
    // SubCategory.belongsTo(MainCategory, { foreignKey: 'parent_id' })

    // MainCategory.findAll({ where: {}, include: [SubCategory] })
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving tutorials."
    //         });
    //     });
};

// Find a single MainCategory with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    MainCategory.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving MainCategory with id=" + id
            });
        });
};

// Update a MainCategory by the id in the request
exports.updateMainCategory = async (req, res) => {
    const id = req.params.id;
    const value = req.body;

    let data = await categoryService.updateMainCategory(value, id)

    if (data == 1) {
        res.send({
            result: 0,
            message: "MainCategory was updated sucessfully"
        })
    } else {
        res.send({
            result: 1,
            message: `Cannot update MainCategory with id=${id}. Maybe MainCategory was not found or req.body is empty!`
        });
    }


};

exports.updateSubCategory = async (req, res) => {
    const id = req.params.id;
    const value = req.body;

    let data = await categoryService.updateSubCategory(value, id);

    if (data == 1) {
        res.json({
            result: 0,
            message: "Subcategory was updated successfully."
        })
    } else {
        res.json({
            result: 1,
            message: `Cannot update MainCategory with id=${id}. Maybe MainCategory was not found or req.body is empty!`
        });
    }


};

exports.deleteMainCategory = async (req, res) => {
    const id = req.params.id;

    let option = {
        where: {
            parent_id: id
        }
    }

    let data = await categoryService.getSubCategoryByOption(option)

    // let data = await SubCategory.findOne({ where: { parent_id: id } })
    if (data) {
        res.send({
            result: 1,
            message: "Category can't delete because of relation with subCategory"
        });
        return;
    }

    let option2 = {
        where: {
            category_id: id
        }
    }

    let { count2 } = await productService.getProductByOption(option2);

    // let data2 = await Product.findOne({ where: { category_id: id } })
    if (count2) {
        res.send({
            result: 1,
            message: "Category can't delete because of relation with product"
        });
        return;
    }
    let result = await categoryService.deleteMainCategory(id);

    if (result == 1) {
        res.send({
            result: 0,
            message: "MainCategory was deleted successfully!"
        })
    } else {
        res.send({
            result: 1,
            message: `Cannot delete MainCategory with id=${id}. Maybe MainCategory was not found!`
        })
    }

    // MainCategory.destroy({
    //     where: { id: id }
    // })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 result: 0,
    //                 message: "MainCategory was deleted successfully!"
    //             });
    //         } else {
    //             res.send({
    //                 result: 1,
    //                 message: `Cannot delete MainCategory with id=${id}. Maybe MainCategory was not found!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             result: 1,
    //             message: "Could not delete MainCategory with id=" + id
    //         });
    //     });
}

exports.deleteSubCategory = async (req, res) => {
    const id = req.params.id;

    let option = {
        where: {
            sub_cat_id: id
        }
    }
    let { count } = await productService.getProductByOption(option);

    // let data = await Product.findOne({ where: { sub_cat_id: id } })
    if (count) {
        res.send({
            result: 1,
            message: "Category can't delete because of relation"
        });
        return;
    }

    let result = await categoryService.deleteSubCategory(id);
    if (result == 1) {
        res.send({
            result: 0,
            message: "SubCategory was deleted successfully!"
        });
    } else {
        res.send({
            result: 1,
            message: `Cannot delete SubCategory with id=${id}. Maybe SubCategory was not found!`
        });
    }
    // SubCategory.destroy({
    //     where: { id: id }
    // })
    //     .then(num => {
    //         if (num == 1) {
    //             res.send({
    //                 result: 0,
    //                 message: "MainCategory was deleted successfully!"
    //             });
    //         } else {
    //             res.send({
    //                 result: 1,
    //                 message: `Cannot delete MainCategory with id=${id}. Maybe MainCategory was not found!`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             resut: 1,
    //             message: "Could not delete MainCategory with id=" + id
    //         });
    //     });
}

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    MainCategory.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    MainCategory.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};