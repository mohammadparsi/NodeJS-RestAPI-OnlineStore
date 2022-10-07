const category = require('../models/category');
const Category = require('../models/category');

exports.createCategory = (req, res, next) => {
    const name = req.body.name;
    const Id = req.body._id;
    const category = new Category({
        name: name,
        _id: Id
    });

    category.save()
    .then((result) => {
      res.status(201).json({
        message: "Category was created successfully.",
        category: category
      });
    }) 
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
      })

    
}