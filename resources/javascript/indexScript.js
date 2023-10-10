const login = "http://localhost:8080/login";
getMovies();
let movies = [];
// JavaScript code to open the modal
const openModalButton = document.getElementById("login-button");
const myModal = new bootstrap.Modal(document.getElementById('login-modal'));
openModalButton.addEventListener("click", () => {
    myModal.show();
});
// Function to perform login
function performLogin() {
    const email = document.getElementById("email").value;
    console.log(email)
    const password = document.getElementById("password").value;
    console.log(password)

    // Create an object with the username and password
    const userData = {
        email: email,
        password: password
    };

    // Send a POST request to the server
    fetch(login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.ok) {
                // Successful login, you can handle it here
                console.log("Login successful");
                myModal.hide();
            } else {
                // Handle login failure, display an error message or take appropriate action
                console.error("Login failed, Please try again");
            }

        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
}

// Add event listener to the login form submit button
const loginButton = document.getElementById("btn-save");
loginButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission
    performLogin(); // Call the login function
});




function getMovies(){
    fetch("http://localhost:8080/movies")
    .then(response => response.json())
    .then(data => {

        let movies = []
        getMovies()

        async function getMovies() {
            try {
                const response = await fetch("http://localhost:8080/movies");
                const data = await response.json();

                const movieList = document.getElementById("movieList");
                data.forEach(movie => {
                    const movieCard = document.createElement("div");
                    movieCard.className = "movie-card";

                    const moviePoster = document.createElement("img");
                    moviePoster.src = movie.posterUrl;
                    moviePoster.className = "movie-poster";
                    movieCard.appendChild(moviePoster);

                    const movieTitle = document.createElement("h2");
                    movieTitle.textContent = movie.title;
                    movieCard.appendChild(movieTitle);

                    const showtimesContainer = document.createElement("div");
                    showtimesContainer.className = "showtimes-container";

                    // Hent tidspunkter fra viewing-objekterne for denne film
                    movie.viewings.forEach(viewing => {
                        const showtimeButton = document.createElement("button");
                        showtimeButton.className = "time-button";
                        showtimeButton.textContent = viewing.showTime;
                        showtimeButton.addEventListener("click", function (event) {
                            event.preventDefault();
                            // Her kan du håndtere, hvad der skal ske, når en tid klikkes, f.eks. omdirigere til booking siden
                        });
                        showtimesContainer.appendChild(showtimeButton);
                    });

                    movieCard.appendChild(showtimesContainer);
                    movieList.appendChild(movieCard);
                });
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    })
}
/*
async function getMovies() {
    try {
        const response = await fetch("http://localhost:8080/movies");
        const data = await response.json();

        const movieList = document.getElementById("movieList");
        data.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";

            const moviePoster = document.createElement("img");
            moviePoster.src = movie.posterUrl;
            moviePoster.className = "movie-poster";
            movieCard.appendChild(moviePoster);

            const movieTitle = document.createElement("h2");
            movieTitle.textContent = movie.title;
            movieTitle.className = "movie-headline";
            movieCard.appendChild(movieTitle);
            const showtimesContainer = document.createElement("div");
            showtimesContainer.className = "showtimes-container";
            movie.showtimes.forEach(showtime => {
                const showtimeButton = document.createElement("button");
                showtimeButton.className = "time-button";
                showtimeButton.textContent = showtime;
                showtimeButton.addEventListener("click", function(event) {
                    event.preventDefault();
                    // Her kan du håndtere, hvad der skal ske, når en tid klikkes, f.eks. omdirigere til booking siden
                });
                
            });
            showtimesContainer.appendChild(showtimeButton);
            movieList.appendChild(movieCard);
            
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

 */

// Find alle tidspunkt-knapper


// Løb igennem hver knap og tilføj en klikhåndterer



/*
function getMovies(){
    fetch("http://localhost:8080/movies")
    .then(response => response.json())
    .then(data => {
        const movieList = document.getElementById("movieList");
        data.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.className = "movie-card";
            
            if(movie.poster && movie.title){
            const moviePoster = document.createElement("img");
            moviePoster.src = movie.poster;
            movieCard.appendChild(moviePoster);

            const movieTitle = document.createElement("h2");
            movieTitle.textContent = movie.title;
            movieCard.appendChild(movieTitle);
            }
            else{
                console.log("Couldn't find movie")
            }
            
            movieList.appendChild(movieCard);
        });
    })
    .catch(error => {
        console.error("An error occurred:", error);
    });
}

/*function getMoviePoster(title) {
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
}*/

