const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    images: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('products', productSchema);