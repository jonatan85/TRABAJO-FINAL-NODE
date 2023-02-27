const mongoose = require('mongoose');

const PlatesSchema = new mongoose.Schema(
    {
        name: String,
        diets: {type: [String],
        enum: {
            values: [
                'China',
                'Vegana',
                'Vegetariana',
                'Proteica',
                'Alemana',
                'Japonesa',
                'Mediterranea',
                'E.E.U.U',
                'Italiana',
                'Francesa',
                'Española',
                'Vasca'
            ]
        }},
        img: String,
        price: String,
        count: String,
        description: String,
    }
);

const Plates = mongoose.model('Plates', PlatesSchema);

module.exports = Plates;