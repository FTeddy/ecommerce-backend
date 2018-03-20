const bcrypt = require('bcrypt');

const salt = 10;

function hash (req, res, next) {

  bcrypt.hash(req.body.password, salt)
}
