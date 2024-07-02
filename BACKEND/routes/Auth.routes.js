const express = require('express');
const router = express.Router();
const UserController = require('../controller/User.controller');

// Route untuk register dan login
router.post('/register', UserController.register);
router.post('/login', UserController.login);

module.exports = router;
