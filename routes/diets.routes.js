const express = require('express');
const Diets = require('../models/Diets.js');
const isAuthJWT = require('../utils/authentication/jsonwebtoken')

const dietsRoutes = express.Router();

dietsRoutes.get('/',  async (req, res, next) => {
  try{
     const diets = await Diets.find()
     return res.status(200).json(diets);
  }catch(err) {
     next(err);
  }
});

dietsRoutes.get('/:id',  async (req, res, next) => {
  const id = req.params.id;
  try {
      const diets = await Diets.findById(id);
      if (diets) {
          return res.status(200).json(diets);
      } else {
          next(createError('La dieta no existe con el id indicado', 404));
      }
  } catch (err) {
      // Next nos permite pasar al siguiente paso dentro del flujo de nuestro servidor
      next(err);
  }
});

dietsRoutes.post('/', async (req, res, next) => {
  try {

     const newdiets = new Diets({...req.body });
     const createDiets = await newdiets.save();
     
     return res.status(201).json(createDiets);
  } catch(err) {
     next(err);
  }
});

dietsRoutes.put('/:id', async (req, res, next) => {
  try {
     const id = req.params.id;
     const modifiedDiets = new Diets({...req.body});
     //Para que no genere un id aleatorio y lo deje como fijo.
     modifiedDiets._id = id;
     // Para actualizar, Pero no me cambia los datos de la movie.
     const dietsUpdate = await Diets.findByIdAndUpdate(
        id,
        modifiedDiets,
        //Añado new = true para que me traiga la movie con los cambios realizados.
        {new: true}
     );
     // Por ultimo el estatus json + paramatro
     return res.status(200).json(dietsUpdate);
  }catch (err) {
     next(err);
  }
});

dietsRoutes.delete('/:id', async (req, res, next) => {
  try{  
     const id = req.params.id;
     await Diets.findByIdAndDelete(id);
     return res.status(200).json('La dieta se a eliminado correctamente.')
  } catch(err) {
     next(err);
  }
});

 module.exports = dietsRoutes;