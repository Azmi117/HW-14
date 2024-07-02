const { Todo } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class TodoController{
    static async getTodo(req, res, next){
        try{
            const data = await Todo.findAll();
            res.status(200).json(data);
        }catch(err){
            next(err);
        }
        
    }
    static async getTodoById(req, res, next){
        try{
            const { id } = req.params;
            if(!id) res.status(400).json({message: 'ID is required'});
            const data = await Todo.findByPk(id);
            if(data){
                res.status(200).json(data);
            }else{
                res.status(404).json({message: 'Not Found'});
            }
        }catch(err){
            next(err);
        }
    }
    static async createTodo(req, res, next){
        try{
            const { title, user_id } = req.body;
            const data = await Todo.create({
                title, user_id
            });
            if(data){
                res.status(201).json(data);
            }else{
                res.status(500).json({message: 'Internal Server Error'});
            }
        }catch(err){
            next(err);
        }
    }
    static async updateTodo(req, res, next){
        try{
            const { id } = req.params;
            if(!id) res.status(400).json({message: 'ID is required'});
            const { title, user_id } = req.body;
            const data = await Todo.update(
                {title, user_id},
                {where: {id}}
            );
            if(data){
                const updatez = await Todo.findByPk(id);
                res.status(201).json(updatez);
            }else{
                res.status(404).json({message: 'Not Found'});
            }
        }catch(err){
            next(err);
        }
    }
    static async deleteTodo(req, res, next){
        try{
            const { id } = req.params;
            if(!id) res.status(400).json({message: 'ID is required'});
            const { title, user_id } = req.body;
            const data = await Todo.destroy({where: {id}});
            if(data){
                res.status(204).send();
            }else{
                res.status(404).json({message: 'Not Found'});
            }
        }catch(err){
            next(err);
        }
    }
}

module.exports = TodoController;