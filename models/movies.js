const credentials = require("../lib/credentials");
const mongoose = require("mongoose");

mongoose.connect(credentials.connectionString, { dbName: "sccprojects", useNewUrlParser: true });

mongoose.connection.on('open', () => {
    console.log('Mongoose connected.')
});

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: Number,
    actors: String,
    profit: Number

});

module.exports = mongoose.model('Movie', movieSchema);



