const jwt = require('jsonwebtoken');

const authorize = (authorizedRoles) => {
  return (req, res, next) => {
    const authHeader = req.get('Authorization');
    console.log(authHeader);
    if (!authHeader) {
      const error = new Error('Not Authenticated');
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
      console.log(decodedToken);
      decodedToken = jwt.verify(token, 'supersecret');
    } catch (error) {
      error.statusCode = 500;
      throw error;
    }

    if (!decodedToken) {
      const error = new Error("Not Authenticated.");
      error.statusCode = 401;
      throw error;
    }

    req.userId = decodedToken.userId;

    const userRole = decodedToken.role;
    if (authorizedRoles && !authorizedRoles.includes(userRole)) {
      const error = new Error("Not Authorized.");
      error.statusCode = 403;
      throw error;
    }

    next();
  }
}

module.exports = { authorize }