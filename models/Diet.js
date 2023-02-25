const mongoose = require('mongoose');

// Añadimos picture.
const dietsSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        img: String,
        description: [{ type: String, required: true, upercase: true}],
    },
    {
        timestamps: true,
    },
);

const Diet = mongoose.model('Diet', dietsSchema);

module.exports = Diet;