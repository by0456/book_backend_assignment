const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
    bid: {
        type: String,
        required: true,
        minlength: 1,
        trim: true

    },
    title: {
        type: String,
        required: false,
        minlength: 1,
        trim: true

    },
    description: {
        type: String,
        required: false,
        minlength: 1,
        trim: true

    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})
const Favourite = mongoose.model('Favourite', FavouriteSchema);

module.exports = {Favourite}