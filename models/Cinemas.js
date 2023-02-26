const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
    name: {type: String, required: true, upercase: true},
    location: {type: String, requier: true, upercase: true},
    movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie'}]
},{
    timestamps : true,
});


const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;