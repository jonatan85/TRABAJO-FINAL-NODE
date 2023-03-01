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

platesRoutes.get('/:id',  async (req, res, next) => {
  const id = req.params.id;
  try {
      const plates = await Plates.findById(id);
      if (plates) {
          return res.status(200).json(plates);
      } else {
          next(createError('No existe un plato con el id indicado', 404));
      }
  } catch (err) {
      // Next nos permite pasar al siguiente paso dentro del flujo de nuestro servidor
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

platesRoutes.put('/:id', async (req, res, next) => {
  try {
     const id = req.params.id;
     const modifiedPLates = new Plates({...req.body});
     //Para que no genere un id aleatorio y lo deje como fijo.
     modifiedPLates.id = id;
     // Para actualizar, Pero no me cambia los datos de la movie.
     const platesUpdate = await Plates.findByIdAndUpdate(
        id,
        modifiedPLates,
        //Añado new = true para que me traiga la movie con los cambios realizados.
        {new: true}
     );
     // Por ultimo el estatus json + paramatro
     return res.status(200).json(platesUpdate);
  }catch (err) {
     next(err);
  }
});

platesRoutes.delete('/:id', async (req, res, next) => {
  try{  
     const id = req.params.id;
     await Plates.findByIdAndDelete(id);
     return res.status(200).json('El plato se a eliminado correctamente.')
  } catch(err) {
     next(err);
  }
});

 module.exports = platesRoutes;