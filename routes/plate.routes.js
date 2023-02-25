const express = require('express');
const Plate = require('../models/Plate.js');
const createError = require('../utils/errors/create-error.js');
const isAuthJWT = require('../utils/middleware/auth-jwt.middleware.js');

const platesRoutes = express.Router();


platesRoutes.get('/', [isAuthJWT], async(req, res, next) => {
    try {
        const plates = await Plate.find().populate('plates');
        return res.status(200).json(plates);
    } catch(err) {
        next(err);
    }
});

platesRoutes.post('/', async(req, res, next) => {
    try{
        const newPlates = new Plate({ ...req.body});
        const createPlates = await newPlates.save();
        return res.status(201).json(createPlates);
    } catch(err) {
        next(err);
    }
});

// Añade peliculas  a los cines.
platesRoutes.put('/add-plates', async (req, res, next) => {
    try {
        const {platesId, dietsId} = req.body;
        if(!platesId) {
            return next(createError('Se necesita un id de cine para poder añadir una peliula', 500))
        }
        if(!dietsId) {
            return next(createError('Se necesita un id de pilicula para añadirlo a el cine', 500))
        }
        const addPlate = await Plate.findByIdAndUpdate(
            platesId,
            {$push: {diet: dietsId}},
            {new: true }
        );
        return res.status(200).json(addPlate);
    } catch(err) {
        next(err);
    }
});

module.exports = platesRoutes;