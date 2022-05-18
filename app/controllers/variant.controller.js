const db = require("../models");
const Variant = db.variant;
const Op = db.Sequelize.Op;
const variantService = require("../services/variant.service")

// Create and Save a new Variant
exports.create = (req, res) => {
    // if (!req.body.title) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a Variant
    const variant = {
        stock_id: req.body.stock_id,
        opt_value_id: req.body.opt_value_id
    };

    // Save Variant in the database
    Variant.create(variant)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Variant."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    let { data, count } = await variantService.getAllVariant();

    res.json({
        result: 0,
        count: count,
        data: data
    })

    // Variant.findAll()
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

// Find a single Variant with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    let data = await variantService.getVariantById(id);

    res.json({
        result: 0,
        data: data
    })

    // Variant.findByPk(id)
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error retrieving Variant with id=" + id
    //         });
    //     });
};

// Update a Variant by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Variant.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Variant was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Variant with id=${id}. Maybe Variant was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Variant with id=" + id
            });
        });
};

// Delete a Variant with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Variant.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Variant was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Variant with id=${id}. Maybe Variant was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Variant with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Variant.destroy({
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
    Variant.findAll({ where: { published: true } })
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