const mongoose = require('mongoose');

const DietsSchema = new mongoose.Schema(
    {
        name: String,
        img: String,
        description: String,
    }
);

const Diets = mongoose.model('Diets', DietsSchema);

module.exports = Diets;