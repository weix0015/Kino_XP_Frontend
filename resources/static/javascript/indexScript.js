const login = "http://localhost:8080/login";
getMovies();
let data = [];

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
// Function to generate date buttons
function generateDateButtons() {
    const dateButtonContainer = document.getElementById('dateButtonContainer');
    const currentDate = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + i);

        const button = document.createElement('button');
        button.className = 'dateButton';
        button.textContent = formatDate(date);
        button.dataset.date = formatDateISO(date);

        dateButtonContainer.appendChild(button);
    }
}

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
}

function formatDateISO(date) {
    return date.toISOString().split('T')[0];
}

// Add click event listeners to date buttons
generateDateButtons();
const dateButtons = document.querySelectorAll('.dateButton');
dateButtons.forEach(button => {
    button.addEventListener('click', function () {
        console.log('Button clicked!');
        const selectedDate = button.getAttribute('data-date');
        filterMoviesByDate(selectedDate);
    });
});

function filterMoviesByDate(selectedDate) {
    console.log(data)
    // Replace 'data' with your movie data variable
    const filteredMoviesPromises = data.map(movie => {
        // Get all viewings for this movie
        const viewingPromises = movie.viewing_ids.map(getViewById);

        // Wait for all viewings to be fetched
        return Promise.all(viewingPromises)
            .then(viewings => {
                // Check if the movie has a viewing on the selected date
                return viewings.some(viewing => {
                    const viewingDate = formatDateISO(new Date(viewing.showTime));
                    return viewingDate === selectedDate;
                });
            })
            .then(isShowingOnSelectedDate => {
                // If the movie is showing on the selected date, include it in the filtered movies
                if (isShowingOnSelectedDate) {
                    return movie;
                }
            });
    });

    // Wait for all movies to be filtered
    Promise.all(filteredMoviesPromises)
        .then(filteredMovies => {
            // Remove undefined values (movies that are not showing on the selected date)
            return filteredMovies.filter(movie => movie !== undefined);
        })
        .then(filteredMovies => {
            if (filteredMovies.length > 0) {
                updateMovieDisplay(filteredMovies);
            } else {
                console.log('No movies are showing on this date.');  // Add this line
            }
        });


// Implement this function to get a viewing by its ID from the data
    function getViewById(viewingId) {
        // Return the Promise from the fetch request
        return fetch(`http://localhost:8080/viewing/${viewingId}`)
            .then(response => response.json());
    }


// Implement this function to update the display of movies
    function updateMovieDisplay(filteredMovies) {
        // Clear the existing movie display (e.g., remove child nodes from the movieList container)

        // Create and append new movie elements for the filteredMovies
        // Append these elements to the movieList container
    }
}




