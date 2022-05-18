const { sequelize } = require("../models");
const db = require("../models");
const Category = db.categorys;
const Op = db.Sequelize.Op;

// Create and Save a new Main Category
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Category
    const category = {
        title: req.body.title,
        description: req.body.description,
        is_parent: req.body.is_parent,
        parent_id: req.body.parent_id,
        status: req.body.status,

    };

    // Save Category in the database
    Category.create(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Category."
            });
        });
};


exports.getParentChildCategory = (req, res) => {
    db.sequelize.query('SELECT c1.*,c2.title as parent FROM categories c1 inner join categories  c2 WHERE  c1.parent_id=c2.id', {
        type: db.sequelize.QueryTypes.SELECT
      }).then(data => {       
          let d = groupBy(data, 'parent_id');

        res.send(d)
      });
      function groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
           const key = obj[property];
           if (!acc[key]) {
              acc[key] = [];
           }
           // Add object to list for given key's value
           acc[key].push(obj);
           return acc;
        }, {});
    }
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const query = "SELECT c1.*,(SELECT c2.title from categories c2 where c2.parent_id = c1.id) from categories c1";
    // const ccc = Category.findAll({
    //     attributes: Object.keys(Category.attributes).concat([
    //         [sequelize.literal('(Select Category.id from Categories c where Category.parent_id = c.id'), 'parent']
    //     ])
    // });
    // res.send(ccc)

    const query2 = '(SELECT c3.*, c3.parent_id as parent from categories c3 where c3.is_parent = true) union (SELECT c1.*,c2.title as parent FROM categories c1 inner join categories  c2 WHERE  c1.parent_id=c2.id)';

    const cats = db.sequelize.query(query2, {
        type: db.sequelize.QueryTypes.SELECT
      }).then(data => {       
          
        res.send(data)
      });

      function groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
           const key = obj[property];
           if (!acc[key]) {
              acc[key] = [];
           }
           // Add object to list for given key's value
           acc[key].push(obj);
           return acc;
        }, {});
     }

    // Category.findAll({ where: condition })
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

// Find a single Category with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Category with id=" + id
            });
        });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Category with id=" + id
            });
        });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Category with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Category.destroy({
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
    Category.findAll({ where: { published: true } })
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