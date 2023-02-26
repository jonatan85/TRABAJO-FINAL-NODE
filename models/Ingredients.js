const mongoose = require('mongoose');

const IngredientsSchema = new mongoose.Schema(
    {
        name: String,
        img: String,
        description: String,
    }
);

const Ingredients = mongoose.model('Ingredients', IngredientsSchema);

module.exports = Ingredients;