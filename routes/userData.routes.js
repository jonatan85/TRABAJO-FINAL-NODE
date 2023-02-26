const express = require('express');
const UserData = require('../models/UserData.js');
const createError = require('../utils/errors/create-error.js');

const userDataRouter = express.Router();

userDataRouter.get('/', async(req, res, next) => {
    try {
        const data = await UserData.find().populate('favoriteMovie');
        return res.status(200).json(data);
    } catch(err) {
        next(err);
    }
});

userDataRouter.get('/all', async(req, res, next) => {
    try {
        const data = await UserData.find();
        return res.status(200).json(data);
    } catch(err) {
        next(err);
    }
});

userDataRouter.post('/data', async(req, res, next) => {
    try{
        const newUserData = new UserData({ ...req.body});
        const createUserData = await newUserData.save();
        return res.status(201).json(createUserData);
    } catch(err) {
        next(err);
    }
});

userDataRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const data = await UserData.findById(id);
        if (data) {
            return res.status(200).json(data);
        } else {
            next(createError('El usuario con el id indicado no existe', 404));
        }
    } catch (err) {
        // Next nos permite pasar al siguiente paso dentro del flujo de nuestro servidor
        next(err);
    }
 });


module.exports = userDataRouter;