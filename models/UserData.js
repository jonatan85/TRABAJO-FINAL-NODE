const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema(
    {
        // favoriteMovie: [{type: mongoose.Types.ObjectId, ref: "Movie"} ],
        username: {type: String, require: true, lowecase: true},
        lastname: {type: String, lowecase: true},
        year: {type: Number, min: 18},
        country: {type: [String], lowercase:true},
    },
    {
        timestamps: true,
    },
);

const UserData = mongoose.model('UserData', UserDataSchema);

module.exports = UserData;