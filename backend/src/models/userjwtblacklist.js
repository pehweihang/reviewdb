
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserJWTBlacklistSchema = new Schema({
    token: {
        type: String,
        required: true,
    },

    createdAt: { 
        type: Date, 
        expires: '7d', 
        default: Date.now 
    },
});

module.exports = mongoose.model('UserJWTBlacklist', UserJWTBlacklistSchema);
