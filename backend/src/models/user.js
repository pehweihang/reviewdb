const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
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
        validate: {
            validator: (v) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: true,
    },

    group: {
        type: String,
        unqiue: true,
        required: false,
    },
});

module.exports = mongoose.model('UserModel', UserSchema);
