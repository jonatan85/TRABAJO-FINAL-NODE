const mongoose = require('mongoose');

const plateSchema = new mongoose.Schema({
    name: {type: mongoose.Types.ObjectId, required: true,  ref: 'UserData'},
    img: String,
    diets: [{ type: mongoose.Types.ObjectId, ref: 'Diet'}],
    price: [{ type: String, required: true, upercase: true}],
    count: [{ type: String, required: true, upercase: true}],
    description: [{ type: String, required: true, upercase: true}],
    
},{
    timestamps : true,
});


const Plate = mongoose.model('Plate', plateSchema);

module.exports = Plate;