getMovies();
let movies= []
getMoviePoster()

function getMovies(){
    fetch("http://localhost:8080/index")
    .then(response => response.json())
    .then(data => {
        const movieList = document.getElementById("movieList");
        data.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";

            const moviePoster = document.createElement("img");
            moviePoster.src = movie.posterUrl;
            movieCard.appendChild(moviePoster);

            const movieTitle = document.createElement("h2");
            movieTitle.textContent = movie.title;
            movieCard.appendChild(movieTitle);

            movieList.appendChild(movieCard);
        });
    })
    .catch(error => {
        console.error("An error occurred:", error);
    });
}

function getMoviePoster(title) {
    // Erstat 'title' med den faktiske titel, du ønsker at søge efter
    const apiUrl = `http://localhost:8080/movie-poster?title=${encodeURIComponent("The Matrix")}`;

    fetch(apiUrl)
        .then(response => response.text()) // eller response.json(), afhængigt af API'ets svarformat
        .then(data => {
            // 'data' indeholder svar fra din backend (f.eks. OMDB API-svaret)
            console.log("OMDB API Response:", data);
            // Behandle API-svaret her
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
}