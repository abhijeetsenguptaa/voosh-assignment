const mongoose = require('mongoose');

const Product_Schema = new mongoose.Schema({
    title: {
        type: String
    },
    image: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    versionKey: false,
    timestamps: true
})

const Product_Model = mongoose.model('products', Product_Schema);

module.exports = Product_Model;