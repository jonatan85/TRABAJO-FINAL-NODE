const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
    name: {type: String, required: true, upercase: true},
    img: String,
    diets: [{ type: mongoose.Types.ObjectId, ref: 'Movie'}],
    price: [{ type: String, required: true, upercase: true}],
    count: [{ type: String, required: true, upercase: true}],
    description: [{ type: String, required: true, upercase: true}],
    
},{
    timestamps : true,
});


const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;