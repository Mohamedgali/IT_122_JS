'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const movies = require("./models/movies");

const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
    defaultLayout: false
}));

app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
    return movies.find({}).lean()
        .then((movies) => {
            res.render('home', { movies });
        })
        .catch(err => next(err));
})

app.get('/detail', (req, res) => {
    const movietitle = req.query.title;
    movies.findOne({title: movietitle}).lean()
    .then((movie) => {
        res.render('detail', {title: movietitle, stats: movie});
    });
});



app.get('/delete', (req, res) => {
    const movietitle = req.query.title;
    movies.findOneAndDelete({title: movietitle}, (err, movie) => {
        //console.log(movie);
        if (err) {
            console.log(err);
        } else if (!movie) {
            console.log(movietitle + " not found");
            res.send(`${movietitle} not found`);
        } else if (movie) {
            console.log(movietitle + " delete successful");
            res.send(`${movietitle} delete successful`);
        }
    });
});
    
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page\n My name is Mohamed and I am pursuing programming degree.');
});

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');
});