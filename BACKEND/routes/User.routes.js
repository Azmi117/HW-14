const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authentication');
const authorize = require('../middlewares/authorization');
const UserController = require('../controller/User.controller');


router.post('/user/create', UserController.createUser);
router.get('/user', UserController.getUser);
router.get('/user/:id', UserController.getUserById);
router.put('/user/edit/:id', UserController.updateUser);
router.delete('/user/delete/:id', UserController.deleteUser);

module.exports = router;