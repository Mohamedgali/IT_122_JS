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
app.use(bodyParser.json());

app.use('/api', require('cors')());


// ALL GET-API

app.get('/api/movies', (req, res) => {
    return movies.find({})
        .then((movies) => {
            res.json(movies)
        })
        .catch(err => {
            res.status(500).send('Error occurred: dabatase error')
        })
})

app.get('/api/movies/:title', (req, res) => {
    const movietitle = req.params.title;
    movies.findOne({ title: movietitle })
        .then((movie) => {
            if (movie === null) {
                return res.status(400).send(`Error: "${movietitle}" not found`)
            } else {
                res.json(movie)
            }
        })
        .catch(err => {
            res.status(500).send('Error occurred: dabatase error', err)
        })
})

app.delete('/api/movies/:title', (req, res) => {
    const movietitle = req.params.title;
    movies.findOneAndDelete({ title: movietitle })
        .then(movie => {
            if (movie === null) {
                return res.status(400).send(`Error: "${movietitle}" not found`)
            } else {
                res.json(movie)
            }
        })

        .catch(err => {
            res.status(500).send('Error occurred: dabatase error', err)
        })
})

app.post('/api/movies/:title', (req, res) => {
    const movietitle = req.params.title;
    movies.findOneAndUpdate({ title: movietitle }, req.body, { upsert: true, new: true })
        .then(movie => {
            res.json(movie)
        })
        .catch(err => {
            res.status(500).send('Error occurred: dabatase error', err)
        })
})


app.get('/', (req, res, next) => {
    return movies.find({}).lean()
        .then((movies) => {
            res.render('home', { movies });
        })
        .catch(err => next(err));
});


app.get('/detail', (req, res) => {
    const movietitle = req.query.title;
    movies.findOne({ title: movietitle }).lean()
        .then((movies) => {
            res.render('detail', { title: movietitle, stats: movies });
        });
});

app.get('/delete', (req, res) => {
    const movietitle = req.query.title;
    movies.findOneAndDelete({ title: movietitle }, (err, movie) => {
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


// Send plain text response
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page\n My name is Mohamed Ali and I am pursuing programming degree.');
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