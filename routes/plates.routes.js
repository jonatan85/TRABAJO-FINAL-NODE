const express = require('express');
const Plates = require('../models/Plates.js');
const isAuthJWT = require('../utils/authentication/jsonwebtoken')

const platesRoutes = express.Router();

platesRoutes.get('/',  async (req, res, next) => {
  try{
     const plates = await Plates.find()
     return res.status(200).json(plates);
  }catch(err) {
     next(err);
  }
});

platesRoutes.post('/', async (req, res, next) => {
  try {
 
     const newPlates = new Plates({...req.body });
     const createPlates = await newPlates.save();
     
     return res.status(201).json(createPlates);
  } catch(err) {
     next(err);
  }
});

 module.exports = platesRoutes;