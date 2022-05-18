const db = require("../models");
const OptionValue = db.optionValue;
const optionValueService = require("../services/optionValue.service")
// Create and Save a new OptionValue
exports.create = (req, res) => {
    // if (!req.body.title) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a OptionValue
    const optionValue = {
        option_id: req.body.parentAttribute,
        value: req.body.subAttribute
    };

    // Save OptionValue in the database
    OptionValue.create(optionValue)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the OptionValue."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    let { data, count } = await optionValueService.getAllOptionValue();

    res.json({
        result: 0,
        count: count,
        data: data
    })

    // OptionValue.findAll()
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

// Find a single OptionValue with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    let data = await optionValueService.getOptionValueById(id)

    res.json(data)

    // OptionValue.findByPk(id)
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: "Error retrieving OptionValue with id=" + id
    //         });
    //     });
};

// Update a OptionValue by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    let value = {
        option_id: req.body.parentAttribute,
        value: req.body.subAttribute

    }
    OptionValue.update(value, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "OptionValue was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update OptionValue with id=${id}. Maybe OptionValue was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating OptionValue with id=" + id
            });
        });
};

// Delete a OptionValue with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    OptionValue.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "OptionValue was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete OptionValue with id=${id}. Maybe OptionValue was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete OptionValue with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    OptionValue.destroy({
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
    OptionValue.findAll({ where: { published: true } })
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