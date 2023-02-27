const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema(
    {
        // favoriteMovie: [{type: mongoose.Types.ObjectId, ref: "Movie"} ],
        email: {type: String, require: true, unique: true, match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "El email no tiene un formato valido."]},
        password: {type: String, require: true },
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