const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authentication');
const authorize = require('../middlewares/authorization');
const TodoController = require('../controller/Todo.controller');

router.put('/api/todo/update/:id', TodoController.updateTodo);
router.delete('/api/todo/delete/:id', TodoController.deleteTodo);
router.get('/api/todo/:id', TodoController.getTodoById);
router.post('/api/todo/create', TodoController.createTodo);
router.get('/api/todo', authenticate, TodoController.getTodo);

module.exports = router;