const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');


const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const googleapi = require('./modules/booksqueryHandler')

const PORT = process.env.PORT || 3050;
const { Favourite, User, BookComment, BookScore } = require('./db/models');

const favourite = require('./modules/favourites');
const bookComment = require('./modules/bookComments');
const bookScore = require('./modules/bookScore');
const users = require('./modules/users');

const Authenticate = require('./modules/authenticate');
const VerifySession = require('./modules/verifySession');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();

});


Authenticate.authenticate;
VerifySession.verifySession;

app.get('/', (req, res) => {
    res.send('welcome');
});

app.post('/users', users.register);
app.post('/users/login', users.login);
app.get('/users/me/access-token', VerifySession.verifySession, users.getAccessToken);

app.get('/booksearch', googleapi.doBookSearch);
app.get('/favourite', Authenticate.authenticate, favourite.getFavourite);
app.get('/favourite/:id', Authenticate.authenticate, favourite.getFavouriteDetails);
app.post('/favourite', Authenticate.authenticate, favourite.addFavourite);
app.delete('/favourite/:id', Authenticate.authenticate, favourite.deleteFavourite);

app.get('/favourite/:id/comment', Authenticate.authenticate, bookComment.getComment);
app.post('/favourite/:id/comment', Authenticate.authenticate, bookComment.addComment);
app.delete('/favourite/:id/comment/:commentId', Authenticate.authenticate, bookComment.deleteComment);
app.put('/favourite/:id/comment/:commentId', Authenticate.authenticate, bookComment.editComment);

app.get('/favourite/:id/bookScore', Authenticate.authenticate, bookScore.getScore);
app.post('/favourite/:id/bookScore', Authenticate.authenticate, bookScore.addScore);
app.delete('/favourite/:id/bookScore/:bookScoreId', Authenticate.authenticate, bookScore.deleteScore);
app.put('/favourite/:id/bookScore/:bookScoreId', Authenticate.authenticate, bookScore.editScore);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));