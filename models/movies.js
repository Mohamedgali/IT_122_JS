// reference db credentials
//const credentials = require("../lib/credentials");

// require mongoose ODM library
const mongoose = require("mongoose");

const connectionString = "mongodb+srv://ghost101:ghost101@cluster0.8hir6.mongodb.net/sccprojects?retryWrites=true&w=majority";

//connect to db via the credentials info
//mongoose.connect(credentials.connectionString, { dbName: "sccprojectdb", useNewUrlParser: true, useUnifiedTopology: true });




// when mongoose connects to mongodb, display confirmation in console
mongoose.connection.on('open', () => {
    console.log('Mongoose connected.')
});
// define movies model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
    title: { type: String, required: true },
    year: Number,
    actors: String,
    profit: Number

});

module.exports = mongoose.model('Movie', mySchema);



