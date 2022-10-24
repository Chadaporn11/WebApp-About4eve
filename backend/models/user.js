const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { 
        type: String, 
        required: true,
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
    },
    password: { 
        type: String, 
        required: true,
    },
    profile: [Object],
});

module.exports = mongoose.model('users', userSchema);