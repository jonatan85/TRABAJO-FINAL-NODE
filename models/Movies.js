const mongoose = require('mongoose');

// Añadimos picture.
const moviesSchema = new mongoose.Schema(
    {
        userData: {type: mongoose.Types.ObjectId, required: true, ref: 'UserData'},
        favoriteCount: {type: Number, min: 0},
        title: {type: String, require: true, lowecase: true},
        director: {type: String, lowecase: true},
        year: {type: Number, min: 1900, max: 2023},
        genre: {type: [String], lowercase:true, enum:['Acción', 'Animación', 'Ciencia ficción', 'Comedia romántica', 'Thriller', 'Drama', 'Romance']},
        picture: String,
    },
    {
        timestamps: true,
    },
);

const Movie = mongoose.model('Movie', moviesSchema);

module.exports = Movie;