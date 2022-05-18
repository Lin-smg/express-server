
const db = require("../models");
const Option = db.option;
const OptionValue = db.optionValue;
const optionService = require("../services/option.service")
// Create and Save a new Option
exports.create = (req, res) => {
    // if (!req.body.title) {
    //     res.status(400).send({
    //         message: "Content can not be empty!"
    //     });
    //     return;
    // }

    // Create a Option
    const option = {
        name: req.body.name
    };

    // Save Option in the database
    Option.create(option)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Option."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.getProductSubAttributes = async (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    let { data, count } = await optionService.getProductSubAttributes();
    res.json({
        result: 0,
        count: count,
        data: data
    })
    // OptionValue.belongsTo(Option, { foreignKey: 'option_id' });
    // Option.hasMany(OptionValue, { foreignKey: 'option_id' })
    // OptionValue.findAll({ include: [Option] })
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

exports.getProductMainAttributes = async (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    let { data, count } = await optionService.getProductMainAttributes();
    res.json({
        result: 0,
        count: count,
        data: data
    })
    // OptionValue.belongsTo(Option, { foreignKey: 'option_id' });
    // Option.hasMany(OptionValue, { foreignKey: 'option_id' })
    // Option.findAll({ include: [OptionValue] })
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


exports.findAll = (req, res) => {
    Option.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

// Find a single Option with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Option.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Option with id=" + id
            });
        });
};

// Update a Option by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Option.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Option was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Option with id=${id}. Maybe Option was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Option with id=" + id
            });
        });
};

// Delete a Option with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;

    const data = await OptionValue.findOne({ where: { option_id: id } });

    if (data) {
        res.send({
            result: 1,
            message: "Option can't delete because of relation"
        });
    } else {
        Option.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        result: 0,
                        message: "Option was deleted successfully!"
                    });
                } else {
                    res.send({
                        result: 1,
                        message: `Cannot delete Option with id=${id}. Maybe Option was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    result: 1,
                    message: "Could not delete Option with id=" + id
                });
            });
    }

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Option.destroy({
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
    Option.findAll({ where: { published: true } })
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