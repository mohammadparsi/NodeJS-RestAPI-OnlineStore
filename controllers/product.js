const Product = require('../models/product');
const Category = require('../models/category');

exports.createProduct = (req, res, next) => {
    const name = req.body.name;
    const category = req.body.category;

    const product = new Product({
        name: name,
        category: category,
    });

    product.save()
    .then((result) => {
        return Category.findById(product.category);
    })
    .then((category) => {
      category.products.push(product);
      return category.save();    
    })
    .then((result) => {
      res.status(201).json({
        message: "Product was created successfully.",
        product: product
      });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
      });
}

