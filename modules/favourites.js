const { mongoose } = require('mongoose');

const bodyParser = require('body-parser');

const { Favourite, User, BookComment, BookScore } = require('../db/models');

exports.getFavourite = (req, res) => {
    Favourite.find({
        _userId: req.user_id
    }).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    });
}

exports.getFavouriteDetails = (req, res) => {
    Favourite.find({
        _id: req.params.id,
        _userId: req.user_id
    }).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    });
}

exports.addFavourite = (req, res) => {
    
    let bid = req.body.bid;
    let title = req.body.title;
    let authors = req.body.authors;
    let description = req.body.description;


    

    let newFavourite = new Favourite({
        bid,
        title,
        authors,
        description,
        _userId: req.user_id
    });
    newFavourite.save().then((listDoc) => {
        res.send(listDoc);
    })
}

let deleteCommentFromFavourite = (_favouriteId) => {
    BookComment.deleteMany({
        _favouriteId
    }).then(() => { })
}

let deleteScoreFromFavourite = (_favouriteId) => {
    BookScore.deleteMany({
        _favouriteId
    }).then(() => { })
}


exports.deleteFavourite = (req, res) => {
    
    Favourite.findOneAndRemove({
        _id: req.params.id,
        _userId: req.user_id
    }).then((removedFavouriteDoc) => {
        res.send(removedFavouriteDoc);

        deleteCommentFromFavourite(removedFavouriteDoc._id);
        deleteScoreFromFavourite(removedFavouriteDoc._id);
    })
}

