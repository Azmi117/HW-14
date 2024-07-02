const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class UserController{
    static async register(req, res, next) {
        try {
            const { username, password, age, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, password: hashedPassword, age, role });
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });

            if (!user || !await bcrypt.compare(password, user.password)) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );
            res.status(200).json({ token });
        } catch (err) {
            next(err);
        }
    }


    static async getUser(req, res, next){
        try{
            const data = await User.findAll();
            res.status(200).json(data);
        }catch(err){
            next(err);
        }
    }
    static async getUserById(req, res, next){
        try{
            const { id } = req.params;
            if(!id) res.status(400).json({message: 'Id is required'});
            const data = await User.findByPk(id);
            if(!data) res.status(404).json({message: 'User Not Found'});
            res.status(200).json(data);
        }catch(err){
            next(err);
        }
    }
    static async createUser(req, res, next){
        try{
            const { username, password, age } = req.body;
            const data = await User.create({
                username, password, age
            });
            res.status(201).json(data);
        }catch(err){
            next(err);
        }
    }
    static async updateUser(req, res, next){
        try{
            const { id } = req.params;
            if(!id) res.status(400).json({message: 'Id required'});
            const {username, password, age} = req.body;
            const data = await User.update(
                {username, password, age},
                {where: {id}}
                );
            if(data){
                const updatez = await User.findByPk(id);
                res.status(201).json(updatez);
            }else{
                res.status(404).json({message: 'Not found'});
            }
        }catch(err){
            next(err);
        }
    }
    static async deleteUser(req, res, next){
        try{
            const { id } = req.params;
            if(!id) res.status(400).json({message: 'Id required'});
            const data = await User.destroy({where: {id}});
            if(data){
                const deletez = await User.findByPk(id);
                res.status(204).send();
            }else{
                res.status(404).json({message: 'Not Found'});
            }
        }catch(err){
            next(err);
        }
    }
}

module.exports = UserController;