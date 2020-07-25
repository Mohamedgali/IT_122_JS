// reference db credentials
const credentials = require("../lib/credentials");

// require mongoose ODM library
const mongoose = require('mongoose');

//connect to db via the credentials info
mongoose.connect(credentials.connectionString, { dbName: "sccprojects", useNewUrlParser: true, useUnifiedTopology: true });



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



