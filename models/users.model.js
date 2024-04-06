const { default: mongoose } = require("mongoose");

const User_Schema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ['super-admin', 'manager', 'user'],
        default: 'user'
    },
    status: {
        type: Boolean,
        default: true
    },
    isPrivate: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
});

const User_Model = mongoose.model('users', User_Schema);

module.exports = User_Model;
