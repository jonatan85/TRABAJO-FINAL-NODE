const mongoose = require('mongoose');

// Añadimos picture.
const moviesSchema = new mongoose.Schema(
    {
        name: {type: mongoose.Types.ObjectId, required: true, ref: 'UserData'},
        img: String,
        description: [{ type: String, required: true, upercase: true}],
    },
    {
        timestamps: true,
    },
);

const Movie = mongoose.model('Movie', moviesSchema);

module.exports = Movie;