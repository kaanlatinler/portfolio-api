const router = require('express').Router();
const { login } = require('../controllers/accountController');

router.post('/login', login);

module.exports = router;