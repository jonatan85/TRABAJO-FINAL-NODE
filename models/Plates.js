const mongoose = require('mongoose');

const PlatesSchema = new mongoose.Schema(
    {
        name: String,
        diets: String,
        img: String,
        price: String,
        count: String,
        description: String,
    }
);

const Plates = mongoose.model('Plates', PlatesSchema);

module.exports = Plates;