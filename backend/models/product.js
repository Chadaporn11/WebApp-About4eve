const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    statusproduct: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users',
        required: true 
   },
    imageproduct: [Object]
}, {timestamps: true});

module.exports = mongoose.model('products', productSchema);