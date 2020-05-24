const { mongoose } = require('mongoose');

const bodyParser = require('body-parser');


const { Favourite, User, BookComment, BookScore } = require('../db/models');

exports.getScore = (req, res) => {
    BookScore.find({
        _favouriteId: req.params.id
    }).then((bookScore) => {
        res.send(bookScore);
    })
}

exports.addScore = (req, res) => {
    //console.log(req.params.id);
    Favourite.findOne({

        _id: req.params.id,
        //_userId: req.user_id
    }).then((favourite) => {
        if (favourite) {

            return true;
        }

        return false;
    }).then((canAddScore) => {
        if (canAddScore) {
            let newBookScore = new BookScore({
                score: req.body.score,
                _favouriteId: req.params.id
            });
            newBookScore.save().then((newTaskDoc) => {
                res.send(newTaskDoc);
            })
        } else {
            res.sendStatus(404);
        }
    })
}

exports.editScore = (req, res) => {

    Favourite.findOne({
        _id: req.params.id,
        //_userId: req.user_id
    }).then((favourite) => {
        if (favourite) {
            return true;
        }
        return false;
    }).then((canUpdateBookScore) => {
        if (canUpdateBookScore) {
            BookScore.findOneAndUpdate({
                _id: req.params.bookScoreId,
                _favouriteId: req.params.id
            }, {
                    $set: req.body
                }
            ).then(() => {
                //console.log( req.params.bookScoreId);
                res.send({ message: 'Updated successfully.' })
            })
        } else {
            res.sendStatus(404);
        }
    })
}

exports.deleteScore = (req, res) => {

    Favourite.findOne({
        _id: req.params.id,
        //_userId: req.user_id
    }).then((favourite) => {
        if (favourite) {

            return true;
        }

        return false;
    }).then((canDeleteScore) => {

        if (canDeleteScore) {
            BookScore.findOneAndRemove({
                _id: req.params.bookScoreId,
                _favouriteId: req.params.id
            }).then((removedScoreDoc) => {
                res.send(removedScoreDoc);
            })
        } else {
            res.sendStatus(404);
        }
    });
}




