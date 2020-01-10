const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 256,
        required: true
    },
    email: {
        type: String,
        min: 6,
        max: 256,
        required: true
    },
    password: {
        type: String,
        min: 6,
        max: 256,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', userSchema);