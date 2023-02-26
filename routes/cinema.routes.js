const express = require('express');
const Cinema = require('../models/Cinemas.js');
const createError = require('../utils/errors/create-error.js');

const cinemasRoutes = express.Router();


cinemasRoutes.get('/', async(req, res, next) => {
    try {
        const cinemas = await Cinema.find().populate('movies');
        return res.status(200).json(cinemas);
    } catch(err) {
        next(err);
    }
});

cinemasRoutes.post('/', async(req, res, next) => {
    try{
        const newCinema = new Cinema({ ...req.body});
        const createCinema = await newCinema.save();
        return res.status(201).json(createCinema);
    } catch(err) {
        next(err);
    }
});

// Añade peliculas  a los cines.
cinemasRoutes.put('/add-movies', async (req, res, next) => {
    try {
        const {cinemaId, moviesId} = req.body;
        if(!cinemaId) {
            return next(createError('Se necesita un id de cine para poder añadir una peliula', 500))
        }
        if(!moviesId) {
            return next(createError('Se necesita un id de pilicula para añadirlo a el cine', 500))
        }
        const addCinema = await Cinema.findByIdAndUpdate(
            cinemaId,
            {$push: {movies: moviesId}},
            {new: true }
        );
        return res.status(200).json(addCinema);
    } catch(err) {
        next(err);
    }
});

module.exports = cinemasRoutes;