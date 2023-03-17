const express = require('express');
const imageToUri = require('image-to-uri');
const fs = require('fs');

const Pizzas = require('../models/pizzas.js');
const createError = require('../utils/errors/create-error.js');
const isAuthJWT = require('../utils/authentication/jsonwebtoken.js');
const upload = require('../utils/middleware/file.middleware.js');

const pizzasRoutes = express.Router();

pizzasRoutes.get('/', (req, res) => {
    res.send('Esta es la lista de pizzas ricas');
});

pizzasRoutes.post('/', async (req, res, next) => {
    try {
       
       const newPizzas = new Pizzas({...req.body });
       const createPizzas = await newPizzas.save();
        
       return res.status(201).json(createPizzas);
    } catch(err) {
       next(err);
    }
 });

module.exports = pizzasRoutes;