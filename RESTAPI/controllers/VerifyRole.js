var jwt = require('jsonwebtoken');
var config = require('../config/jwt'); // get our config file

function verifyRole(req, res, next) {
  var role = req.headers['role'];
  var token = req.headers['bearer'];
  console.error(req.headers);

  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  if (!role)
    return res.status(403).send({ auth: false, message: 'No role provided.' });

  if (role !== 'admin')
    return res
      .status(403)
      .send({ auth: false, message: 'Admin permissions needed.' });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyRole;
