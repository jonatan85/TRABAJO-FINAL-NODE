const express = require('express');
const Ingredients = require('../models/Ingredients.js');
const isAuthJWT = require('../utils/authentication/jsonwebtoken')

const ingredientsRoutes = express.Router();

ingredientsRoutes.get('/',  async (req, res, next) => {
  try{
     const ingredients = await Ingredients.find()
     return res.status(200).json(ingredients);
  }catch(err) {
     next(err);
  }
});

ingredientsRoutes.get('/:id',  async (req, res, next) => {
  const id = req.params.id;
  try {
      const ingredients = await Ingredients.findById(id);
      if (ingredients) {
          return res.status(200).json(ingredients);
      } else {
          next(createError('No existe el Ingrediente con el id indicado', 404));
      }
  } catch (err) {
      // Next nos permite pasar al siguiente paso dentro del flujo de nuestro servidor
      next(err);
  }
});

ingredientsRoutes.post('/', async (req, res, next) => {
  try {

     const newIngridients = new Ingredients({...req.body });
     const createIngredients = await newIngridients.save();
     
     return res.status(201).json(createIngredients);
  } catch(err) {
     next(err);
  }
});

ingredientsRoutes.put('/:id', async (req, res, next) => {
  try {
     const id = req.params.id;
     const modifiedIngredients = new Ingredients({...req.body});
     //Para que no genere un id aleatorio y lo deje como fijo.
     modifiedIngredients._id = id;
     // Para actualizar, Pero no me cambia los datos de la movie.
     const ingredientsUpdate = await Ingredients.findByIdAndUpdate(
        id,
        modifiedIngredients,
        //Añado new = true para que me traiga la movie con los cambios realizados.
        {new: true}
     );
     // Por ultimo el estatus json + paramatro
     return res.status(200).json(ingredientsUpdate);
  }catch (err) {
     next(err);
  }
});

ingredientsRoutes.delete('/:id', async (req, res, next) => {
  try{  
     const id = req.params.id;
     await Ingredients.findByIdAndDelete(id);
     return res.status(200).json('El ingrediente se a eliminado correctamente.')
  } catch(err) {
     next(err);
  }
});

 module.exports = ingredientsRoutes;