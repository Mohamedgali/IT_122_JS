const credentials = require("../lib/credentials");
const mongoose = require("mongoose");

mongoose.connect(connectionString, { dbName: "sccprojects", useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('open', () => {
    console.log('Mongoose connected.')
});

const mySchema = mongoose.Schema({
    title: { type: String, required: true },
    year: Number,
    actors: String,
    profit: Number

});

module.exports = mongoose.model('Movie', mySchema);



