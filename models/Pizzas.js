const mongoose = require('mongoose');

const pizzasSchema = new mongoose.Schema(
    {
        name: String
    },
    {
        timestamps: true
    }
)

const Pizzas = mongoose.model('Pizzas', pizzasSchema);

module.exports = Pizzas;