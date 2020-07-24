const expect = require("chai").expect;
const movies = require("../data");

const showMovies = movies.getAll();

describe("Movie module", () => {
// Get Item Tests
    it("Returns requested movie", () => {
        const result = movies.getDetail("Black Panther");
        //expect result to match provided output
        expect(result).to.deep.equal({title: 'Black Panther', year: 2018, actors: 'Chadwick Boseman', profit: 1000 });
    });

    it("Fails to return - invalid movie", () => {
        const result = movies.getDetail("Deep Sea");
        //expect return msg to match provided output
        expect(result.msg).to.deep.equal('"Deep Sea" not found');
    });
// Add Item Tests
    it("Adds requested movie", () => { 
        movies.addMovie("Joker", 2019, "Joaquin Phoenix", 1000000);
        //expect updated array to include addition
        expect(showMovies).to.deep.include({ title: 'Joker', year: 2019, actors: 'Joaquin Phoenix', profit:1000000 });
    });

    it("Fails to add due to missing params", () => {
        movies.addMovie("Monneys", "Alean");
        //expect array to not include incomplete entry  
        expect(showMovies).to.not.include({ title: 'Monneys', year: 1899, actors: 'Alean', profit: 23242 });
        //expect return msg to match provided output
        expect (movies.addMovie("Monneys", "Alean").msg).to.deep.equal('incomplete info');
    });
// Delete Item Tests
    it("Deletes requested movie", () => {
        movies.delMovie("Get Out");
        //expect updated array to not include deleted item
        expect(showMovies).to.not.include({ title: 'Get Out', year: 2017, actors: 'Daniel Kaluuya', profit: 4000});
    });

    it("Delete failed due to title mismatch", () => {
        movies.delMovie("There will be Blood");
        // Confirm entered title does not exist, and return msg matches provided output
        expect(movies.getDetail("There will be Blood").msg).to.deep.equal('"There will be Blood" not found');
    })

    


});