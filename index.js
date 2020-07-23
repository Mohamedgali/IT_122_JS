'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const movies = require("./data");





const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    defaultLayout: false
}));

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// Set location for static files
app.use(express.static(__dirname + '/public'));

// Parse form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Create variable to reference getter method from data.js
const movies = movies.getAll();

// Route path for home page. renders home.handlebars in the response, along with dynamic content from the exported data getter method
app.get('/', (req, res) => {
    res.type('text/html');
const showMovies = movies.getAll();
    res.render('home', { movies: showMovies });
});

// Route path for detail page. Renders detail.handlebars, with the movie title passed in the query. dynamic content is passed including the title in the query, and the getDetail method with the title in the query as a parameter
app.get('/detail', (req, res) => {
    const movietitle = req.query.title
    res.render('detail', { title: movietitle, stats: movies.getItem(movietitle) });
});

// Send plain text response
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page\n My name is Mohamed and I am pursuing programming degree.');
});

// Define 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});