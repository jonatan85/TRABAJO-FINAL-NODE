const express = require('express');
const Plates = require('../models/Plates.js');
const createError = require('../utils/errors/create-error.js');
const isAuthMovie = require('../utils/middleware/auth-movie.middleware.js');
const upload = require('../utils/middleware/file.middleware.js');
const imageToUri = require('image-to-uri');
const fs = require('fs');
const uploadToCloudinary = require('../utils/middleware/cloudinay.middleware.js')
const UserData = require('../models/UserData.js');
const isAuthJWT = require('../utils/middleware/auth-jwt.middleware');

const moviesRoutes = express.Router();

moviesRoutes.get('/', [isAuthJWT], async (req, res, next) => {
    try{
       const plates = await Plates.find().populate('userData');
       return res.status(200).json(plates);
    }catch(err) {
       next(err);
    }
 });

 cinemasRoutes.post('/', async(req, res, next) => {
    try{
        const newPlates = new Plates({ ...req.body});
        const createPlates = await newPlates.save();
        return res.status(201).json(createPlates);
    } catch(err) {
        next(err);
    }
});

 module.exports = platesRoutes;