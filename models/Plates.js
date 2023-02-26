const mongoose = require('mongoose');

const PlatesSchema = new mongoose.Schema(
    {
        name: {type: String, require: true, lowecase: true},
        img: String,
        diets: {type: String, lowecase: true},
        price: {type: Number, min: 18},
        count: {type: Number, min: 18},
        description: {type: [String], lowercase:true},
    },
    {
        timestamps: true,
    },
);

const PlatesData = mongoose.model('Plates', PlatesSchema);

module.exports = PlatesData;