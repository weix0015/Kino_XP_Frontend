getMovies();
let movies= []

const URLkommuner = "http://localhost:8080/movies"
const URLkommune  = "http://localhost:8080/movie"
const URLregioner  = "http://localhost:8080/regioner"
function getMovies(){
    fetch('http://localhost:8080/getAllMovie')
        .then(result => {
            if (result.status >= 400) {
                throw new Error("Server returned an error");
            }
            return result.json();
        }).then(body => {
            movies = body

        }).
    catch(error => {
        console.error("There was an error fetching the data:", error);
    });
}