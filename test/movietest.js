const expect = require("chai").expect;
const movies = require("../data");

const showMovies = movies.getAll();

describe("Movie module", () => {
// get Item Tests
    it("returns requested movie", () => {
        const result = movies.getDetail("Black Panther");
        expect(result).to.deep.equal({title: 'Black Panther', year: 2018, actors: 'Chadwick Boseman', profit: 1000 });
    });

    it("fails w/ invalid movie", () => {
        const result = movies.getDetail("Deep Sea");
        expect(result.msg).to.deep.equal('"Deep Sea" do not exist');
    });
// add Item Tests
    it("adds requested movie", () => { 
        movies.addMovie("Joker", 2019, "Joaquin Phoenix", 1000000);
        expect(showMovies).to.deep.include({ title: 'Joker', year: 2019, actors: 'Joaquin Phoenix', profit:1000000 });
    });

    it("fails w/ invalid movie", () => {
        movies.addMovie("Monneys", "Alean");
        expect(showMovies).to.not.include({ title: 'Monneys', year: 1899, actors: 'Alean', profit: 23242 });
        expect (movies.addMovie("Monneys", "Alean").msg).to.deep.equal('incomplete info');
    });
// Delete Item Tests
    it("deletes requested movie", () => {
        movies.delMovie("Get Out");
        expect(showMovies).to.not.include({ title: 'Get Out', year: 2017, actors: 'Daniel Kaluuya', profit: 4000});
    });

    it("fails w/ mismatch movie ", () => {
        movies.delMovie("There will be Blood");
        expect(movies.getDetail("There will be Blood").msg).to.deep.equal('"There will be Blood" not found');
    })

    


});