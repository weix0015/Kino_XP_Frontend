const login = "http://localhost:8080/login";
getMovies();


function getMovies() {
    fetch("http://localhost:8080/movies")
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById("movieList");
            data.forEach(movie => {
                console.log(data)
                console.log(movie)
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
                console.log(movie.viewing_ids);
                if (movie.viewing_ids !== null) {
                    // Iterate through each viewing ID
                    movie.viewing_ids.forEach(viewingId => {
                        // Fetch the associated Viewing object from the backend based on the ID
                        fetch(`http://localhost:8080/viewing/${viewingId}`)
                            .then(response => response.json())
                            .then(viewing => {
                                // Access the properties of the fetched Viewing object
                                const showtimeButton = document.createElement("button");
                                showtimeButton.className = "time-button";
                                showtimeButton.textContent = new Date(viewing.showTime).toLocaleString(); // Format showTime on the frontend
                                showtimeButton.addEventListener("click", function (event) {
                                    event.preventDefault();
                                    // Handle what should happen when a time is clicked
                                });
                                showtimesContainer.appendChild(showtimeButton);
                            })
                            .catch(error => {
                                // Handle errors in fetching Viewing data
                                console.error("Error fetching viewing:", error);
                            });
                    });
                } else {
                    // Handle the case where there is no viewing information or it's not in the expected format
                    const errorMessage = document.createElement("p");
                    errorMessage.textContent = "Movie viewing information is missing or not in the expected format for " + movie.title;
                    showtimesContainer.appendChild(errorMessage);
                }

                movieCard.appendChild(showtimesContainer);
                movieList.appendChild(movieCard);
            });
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
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


// Function to fetch objects by their IDs and insert them into a list
    async function fetchViewingsList(ids, listElementId) {
        const listElement = document.getElementById(listElementId);

        if (!listElement) {
            console.error(`List element with ID ${listElementId} not found.`);
            return;
        }

        // Loop through the array of IDs
        for (const id of ids) {
            try {
                const response = await fetch(`http://localhost:8080/viewing/${id}`); // Replace with your API endpoint
                if (response.ok) {
                    const data = await response.json();
                    const listItem = document.createElement('li');
                    listItem.textContent = data.name; // Change 'name' to the property you want to display
                    listElement.appendChild(listItem);
                } else {
                    console.error(`Failed to fetch object with ID ${id}`);
                }
            } catch (error) {
                console.error(`Error while fetching object with ID ${id}: ${error}`);
            }
        }
    }



