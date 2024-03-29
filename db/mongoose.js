const mongoose = require('mongoose');

//const URI = "mongodb+srv://dbUser:dbUser@cluster0-hmpcl.mongodb.net/BookShop?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/BookShop", {useNewUrlParser: true, poolSize: 10}).then(() => {
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