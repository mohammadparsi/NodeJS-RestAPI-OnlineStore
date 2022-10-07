const User = require('../models/user');
const Role = require('../models/role');

exports.createUser = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const user = new User({
        email: email,
        name: name,
        password: password,
        status: "active",
        role: 1
    });

    user.save()
    .then((result) => {
        return Role.findById(user.role);
    })
    .then((role) => {
      role.users.push(user);
      return role.save();    
    })
    .then((result) => {
      res.status(201).json({
        message: "User was created successfully.",
        user: user
      });
    }) 
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
      })

    
}