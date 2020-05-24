const mongoose = require('mongoose');

const BookCommentSchema = new mongoose.Schema({

    comment: {
        type: String,
        required: false,
        minlength: 1,
        trim: true

    },
    _favouriteId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})
const BookComment = mongoose.model('BookComment', BookCommentSchema);

module.exports = {BookComment}