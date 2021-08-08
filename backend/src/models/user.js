const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },

    group: {
        type: String,
        unqiue: true,
        required: false,
        default: "",
    },
});

module.exports = mongoose.model('UserModel', UserSchema);
