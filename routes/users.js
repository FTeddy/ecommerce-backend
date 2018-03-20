var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');
const JWT = require('../middleware/jwt.js');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/signup', JWT.getJWT, UserController.signUp)
router.get('/admin', JWT.authAdminJWT)

module.exports = router;
