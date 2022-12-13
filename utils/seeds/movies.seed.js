const mongoose = require('mongoose');
const Movie = require('../../models/Movies.js');
const fs = require('fs');

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    const allMovies = await Movie.find();

    if (allMovies.length) {
        // Elimina todo el contenido de la colección
        await Movie.collection.drop();
    }
}).catch(err => {
    console.log(`Ha habido un error eliminando los datos: ${err}`);
})


.then(async () => {
    // Añadir los nuevos elementos a nuestra colección.
    const data = fs.readFileSync('./utils/seeds/db/movies.json');
    const parsedData = JSON.parse(data);
    const moviesDocs = parsedData.map((movie) => {
        return new Movie(movie);
    });
    await Movie.insertMany(moviesDocs);
})
.catch((err) => {
    console.log(`Ha habido un error añadiendo los elementos a la base de datos: ${err}`);
})
// mongoose.disconnect --> desconecta la conexión actual a la base de datos.
.finally(() => mongoose.disconnect());
