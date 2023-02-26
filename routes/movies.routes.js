const express = require('express');
const Movie = require('../models/Movies.js');
const createError = require('../utils/errors/create-error.js');
const isAuthMovie = require('../utils/middleware/auth-movie.middleware.js');
const upload = require('../utils/middleware/file.middleware.js');
const imageToUri = require('image-to-uri');
const fs = require('fs');
const uploadToCloudinary = require('../utils/middleware/cloudinay.middleware.js')
const UserData = require('../models/UserData.js');
const isAuthJWT = require('../utils/middleware/auth-jwt.middleware');

const moviesRoutes = express.Router();


// Añadimos el middleware entre la llamada del endPoint y la función.
// Los middleware que añadamos es ejecutar en el orden de el array, empezando en la poscion 0 y con next pasara a la posición 1 de el array de middleware.
// Si no se registra y se loguea no tendra acceso a la ficha tecnica de todas las peliculas.
moviesRoutes.get('/', [isAuthJWT], async (req, res, next) => {
   try{
      const movies = await Movie.find().populate('userData');
      return res.status(200).json(movies);
   }catch(err) {
      next(err);
   }
});
moviesRoutes.get('/:id', [isAuthJWT], async (req, res, next) => {
   const id = req.params.id;
   try {
       const movies = await Movie.findById(id);
       if (movies) {
           return res.status(200).json(movies);
       } else {
           next(createError('No existe una pelicula con el id indicado', 404));
       }
   } catch (err) {
       // Next nos permite pasar al siguiente paso dentro del flujo de nuestro servidor
       next(err);
   }
});

moviesRoutes.get('/title/:title', async (req, res, next) => {
   try{
      const title = req.params.title;
      const titleMovie = await Movie.find({title: title});
      return res.status(200).json(titleMovie);
   } catch(err) {
      next(err);
   }
});

moviesRoutes.get('/genre/:genre', async (req, res, next) => {
   try{
      const genre = req.params.genre;
      const genreMovie = await Movie.find({genre: genre})
      return res.status(200).json(genreMovie);
   } catch(err) {
      next(err);
   }
});

moviesRoutes.get('/year/:year', async (req, res, next) => {
   try{
      const year = req.params.year;
      const yearMovie = await Movie.find({year: year});
      return res.status(200).json(yearMovie);
   } catch(err) {
      next(err);
   }
});

// Añadimos el middleware para que al crear una nueva pelicula le podamos añadir una imagen.
// Añadimos single por que solo permitimos subir un archivo.
// Mediante un ternario indicamos que el nombre los extraiga de req.file.filname con multer, si no devuelve un null.
// Añadimos la picture a la creación de la movie.
// Importamos uri para tranformar a base 64(tranformamos la imagen en datos alfa-numericos).
// path que tiene la ruta de el servidor.
// Transformamos picturePath en datos.
// Lo añadimos a la pelicula.
// La eliminamos con unlinkSync.
moviesRoutes.post('/', [upload.single('picture')], async (req, res, next) => {
   try {
      const picturePath = req.file ? req.file.path : null;
      const picture = imageToUri(picturePath);
   
      const newMovie = new Movie({...req.body, picture });
      const createMovies = await newMovie.save();
      
      await fs.unlinkSync(picturePath);
      
      return res.status(201).json(createMovies);
   } catch(err) {
      next(err);
   }
});

// EndPiont de cloudinary
moviesRoutes.post('/to-cloud', [upload.single('picture'), uploadToCloudinary], async (req, res, next) => {
   try {
      const newMovie = new Movie({...req.body, picture: req.file_url });
      const createMovies = await newMovie.save();
      
      return res.status(201).json(createMovies);
   } catch(err) {
      next(err);
   }
});

moviesRoutes.put('/:id', async (req, res, next) => {
   try {
      const id = req.params.id;
      const modifiedMovies = new Movie({...req.body});
      //Para que no genere un id aleatorio y lo deje como fijo.
      modifiedMovies._id = id;
      // Para actualizar, Pero no me cambia los datos de la movie.
      const movieUpdate = await Movie.findByIdAndUpdate(
         id,
         modifiedMovies,
         //Añado new = true para que me traiga la movie con los cambios realizados.
         {new: true}
      );
      // Por ultimo el estatus json + paramatro
      return res.status(200).json(movieUpdate);
   }catch (err) {
      next(err);
   }
});

moviesRoutes.delete('/:id', async (req, res, next) => {
   try{  
      const id = req.params.id;
      await Movie.findByIdAndDelete(id);
      return res.status(200).json('La pelicula se a eliminado correctamente.')
   } catch(err) {
      next(err);
   }
});
// Añade las peliculas favoritas a los usuarios.
moviesRoutes.post('/add-favorite', async (req, res, next) => {
   try {
      const {movieid, userDataid } = req.body;
      const currMovie = await Movie.findById(movieid);
      const currFavoriteCount = currMovie.favoriteCount;
      const updatedMovie = await Movie.findByIdAndUpdate(
         movieid,
         {$set: {favoriteCount: currFavoriteCount }},
         {new: true}
      );
      const updatedUserData = await UserData.findByIdAndUpdate(
         userDataid,
         {$push: {favoriteMovie: movieid}},
         {new: true}
      );
      return res.status(200).json({
         movie: updatedMovie,
         userdata: updatedUserData
      });

   } catch(err) {
      next(err);
   }
});

module.exports = moviesRoutes;