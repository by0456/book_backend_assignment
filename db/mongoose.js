const mongoose = require('mongoose');

const URI = "mongodb+srv://dbUser:dbUser@cluster0-hmpcl.mongodb.net/BookShop?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(URI, {useNewUrlParser: true}).then(() => {
    console.log("Connected ot MongoDB successfully")

}).catch((e)=>{
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
})


mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
}