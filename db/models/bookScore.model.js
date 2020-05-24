const mongoose = require('mongoose');

const BookScoreSchema = new mongoose.Schema({

    score: {
        type: Number,
        required: false,
        minlength: 1,
        trim: true

    },
    _favouriteId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})
const BookScore = mongoose.model('BookScore', BookScoreSchema);

module.exports = {BookScore}