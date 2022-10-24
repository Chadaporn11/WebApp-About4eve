const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true,
        unique: true,
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('profileusers', profileSchema);
