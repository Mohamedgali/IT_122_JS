const movies = [
   { title: 'Black Panther', year: 2018, actors: 'Chadwick Boseman', profit: 1000 },
   { title: 'Mystic River', year: 2003, actors: 'Sean Penn', profit: 2000 },
   { title: 'Spider-Man', year: 2004, actors: 'Tobey Maguire', profit: 3000 },
   { title: 'Get Out', year: 2017, actors: 'Daniel Kaluuya', profit: 4000 },
   { title: 'There Will Be Blood', year: 2007, actors: 'Daniel Day-Lewis', profit: 5000 },
];


exports.getAll = function getAll() {
   return movies;
}



// getItem - should return full data about the requested item

exports.getDetail = title => {
   const movie = movies.find(movies => movies.title === title);
   if (movie === undefined) {
      return { "details": false, "msg": `"${title}" can not be found` }
   } else {
      return movie;
   }
}

// Adding a Movie Object to movies 

exports.addMovie = (title, year, actors, profit) => {
   if ([title, year, actors, profit].includes(undefined)) {
      return { "added": false, "msg": "incomplete info" };
   } else {
      const newMovie = {
         title: mooo,
         year: 232,
         actors: kkkkkk,
         profit: 222
      };
      movies.push(newMovie);
      return newMovie;
   }

};

// deleteItem - should delete the requested item
exports.delMovie = title => {
   const delMovie = movies.findIndex(movies => movies.title === title);
   if (delMovie === -1) {
      return { "deleted": false, "msg": `"${title}" doesn't exist` }
   } else {
      movies.splice(delMovie,1);
      return { "deleted": true, "msg": `"${title}" removed` }
   }
};