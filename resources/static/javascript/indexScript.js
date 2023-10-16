let movieData;
// Formater dato
function formatDateInDanish(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
    const danishDate = date.toLocaleDateString('da-DK', options);
    const uppercaseDanishDate = danishDate.toUpperCase();
    return uppercaseDanishDate;
}

// Function to fetch and display movies
async function getMovies() {
    try {
        const response = await fetch("http://localhost:8080/movies");
        movieData = await response.json();
        const movieList = document.getElementById("movieList");
        movieList.innerHTML = ''; // Clear the movieList

        for (const movie of movieData) {
            const movieCard = document.createElement("div");
            movieCard.className = "mb-4 d-flex"; // Use Bootstrap classes to make it a flex container

            const posterContainer = document.createElement("div");
            posterContainer.className = "poster-container";

            const moviePoster = document.createElement("img");
            moviePoster.src = movie.posterUrl;
            moviePoster.className = "movie-poster"; // Use Bootstrap classes
            posterContainer.appendChild(moviePoster);

            const titleShowtimesContainer = document.createElement("div");
            titleShowtimesContainer.className = "title-showtimes-container d-flex flex-column";

            const titleContainer = document.createElement("div");
            titleContainer.className = "movie-title";

            const movieTitle = document.createElement("h2");
            movieTitle.textContent = movie.title;
            titleContainer.appendChild(movieTitle);

            if (movie.viewing_ids !== null) {
                movieTitle.textContent += " Show Times";
            }
            if (movie.title === "Morbius") {
                movieTitle.textContent = "Morbin Times";
            }

            const showtimesContainer = document.createElement("div");
            showtimesContainer.className = "showtimes-container";

            if (movie.viewing_ids !== null) {
                // Fetch all viewings and sort them by date
                const viewings = await Promise.all(
                    movie.viewing_ids.map(async viewingId => {
                        const response = await fetch(`http://localhost:8080/viewing/${viewingId}`);
                        return response.json();
                    })
                );

                viewings.sort((a, b) => new Date(a.showTime) - new Date(b.showTime));

                for (const viewing of viewings) {
                    const showtimeButton = document.createElement("button");
                    showtimeButton.className = "btn btn-primary mr-2"; // Use Bootstrap classes
                    showtimeButton.textContent = formatDateInDanish(new Date(viewing.showTime));
                    showtimesContainer.appendChild(showtimeButton);
                }
            } else {
                const errorMessage = document.createElement("p");
                errorMessage.textContent = "Movie viewing information is missing or not in the expected format for " + movie.title;
                showtimesContainer.appendChild(errorMessage);
            }

            titleShowtimesContainer.appendChild(titleContainer);
            titleShowtimesContainer.appendChild(showtimesContainer);

            movieCard.appendChild(posterContainer);
            movieCard.appendChild(titleShowtimesContainer);

            movieList.appendChild(movieCard);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Call the getMovies function when the page loads
window.addEventListener('load', getMovies);


// Function to generate date buttons
function generateDateButtons() {
    const dateButtonContainer = document.getElementById('dateButtonContainer');
    const currentDate = new Date();

    // Create a button for "Alle dage"
    const allDaysButton = document.createElement('button');
    allDaysButton.className = 'dateButton btn btn-secondary'; // Use Bootstrap classes
    allDaysButton.textContent = 'ALLE DAGE';
    allDaysButton.dataset.date = ''; // You can set this to an empty string or any other value you prefer

    // Add a click event listener to "Alle dage" button
    allDaysButton.addEventListener('click', function () {
        console.log('Alle dage Button clicked!');
        // Clear any selected date filter
        clearDateFilter();
    });

    dateButtonContainer.appendChild(allDaysButton);

    for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() + i);

        const button = document.createElement('button');
        button.className = 'dateButton btn btn-secondary'; // Use Bootstrap classes
        button.textContent = formatDate(date);
        button.dataset.date = formatDateISO(date);

        dateButtonContainer.appendChild(button);
        // Add a click event listener to date buttons
        button.addEventListener('click', function () {
            console.log('Button clicked!');
            const selectedDate = button.getAttribute('data-date');
            filterMoviesByDate(selectedDate);
        });
    }
}
function clearDateFilter() {
    // Remove any date filter (selectedDate) and display all movies
    updateMovieDisplay(movieData);
}

// Function to format a date
function formatDate(date) {
    const dayNames = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const formattedDate = `${dayNames[date.getDay()]} d${day} ${month}`.toUpperCase();

    return formattedDate;
}

// Function to format a date to ISO format
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


// Function to filter movies by date
function filterMoviesByDate(selectedDate) {
    console.log(movieData); // Ensure movieData is correctly loaded

    // Create an array to store promises for each movie filtering
    const filteredMoviesPromises = [];

    movieData.forEach(movie => {
        if (selectedDate === '') { // If "Alle dage" is selected, no filtering is needed
            filteredMoviesPromises.push(movie);
        } else {
            // Get all viewings for this movie
            const viewingPromises = movie.viewing_ids.map(viewingId => getViewById(viewingId));

            // Wait for all viewings to be fetched for this movie
            const movieFilterPromise = Promise.all(viewingPromises)
                .then(viewings => {
                    // Filter viewings for the selected date
                    const viewingsOnSelectedDate = viewings.filter(viewing => {
                        const viewingDate = formatDateISO(new Date(viewing.showTime));
                        return viewingDate === selectedDate;
                    });

                    // If there are viewings on the selected date, update the movie's viewings
                    if (viewingsOnSelectedDate.length > 0) {
                        movie.viewing_ids = viewingsOnSelectedDate.map(viewing => viewing.id);
                        return movie;
                    }
                });

            filteredMoviesPromises.push(movieFilterPromise);
        }
    });

    // Wait for all movies to be filtered
    Promise.all(filteredMoviesPromises)
        .then(filteredMovies => {
            // Remove undefined values (movies that have no viewings on the selected date)
            const validMovies = filteredMovies.filter(movie => !!movie);
            if (validMovies.length > 0) {
                updateMovieDisplay(validMovies);
            } else {
                const movieList = document.getElementById("movieList");
                movieList.innerHTML = ''; // Clear the movieList
                showPopup('No movies on selected date');
            }
        });
}


function updateMovieDisplay(movies) {
    const movieList = document.getElementById("movieList");
    movieList.innerHTML = ''; // Clear the movieList

    for (const movie of movies) {
        const movieCard = document.createElement("div");
        movieCard.className = "mb-4 d-flex"; // Use Bootstrap classes to make it a flex container

        const posterContainer = document.createElement("div");
        posterContainer.className = "poster-container";

        const moviePoster = document.createElement("img");
        moviePoster.src = movie.posterUrl;
        moviePoster.className = "movie-poster"; // Use Bootstrap classes
        posterContainer.appendChild(moviePoster);

        const titleShowtimesContainer = document.createElement("div");
        titleShowtimesContainer.className = "title-showtimes-container d-flex flex-column";

        const titleContainer = document.createElement("div");
        titleContainer.className = "movie-title";

        const movieTitle = document.createElement("h2");
        movieTitle.textContent = movie.title;
        titleContainer.appendChild(movieTitle);

        if (movie.viewing_ids !== null) {
            movieTitle.textContent += " Show Times";
        }
        if (movie.title === "Morbius") {
            movieTitle.textContent = "Morbin Times";
        }

        const showtimesContainer = document.createElement("div");
        showtimesContainer.className = "showtimes-container";

        if (movie.viewing_ids !== null) {
            // Fetch all viewings and sort them by date
            movie.viewing_ids.map(async (viewingId) => {
                // Fetch the viewing data (you can use fetch or any other method here)
                // For simplicity, let's assume you have a function getViewById(viewingId)
                const response = await fetch(`http://localhost:8080/viewing/${viewingId}`);
                const viewing = await response.json();

                // Create a showtime button and add it to the showtimesContainer
                const showtimeButton = document.createElement("button");
                showtimeButton.className = "btn btn-primary mr-2"; // Use Bootstrap classes

                // Check and format the date here, ensure it's in a valid format
                const formattedDate = formatDateInDanish(new Date(viewing.showTime));
                showtimeButton.textContent = formattedDate;
                showtimesContainer.appendChild(showtimeButton);
            });

            // Sort viewings by date (if needed)
            movie.viewing_ids.sort((a, b) => new Date(a.showTime) - new Date(b.showTime));
        }

        titleShowtimesContainer.appendChild(titleContainer);
        titleShowtimesContainer.appendChild(showtimesContainer);

        movieCard.appendChild(posterContainer);
        movieCard.appendChild(titleShowtimesContainer);

        movieList.appendChild(movieCard);
    }
}

// Function to show the popup with a message
function showPopup(message) {
    const popupContainer = document.getElementById('popupContainer');
    const popupMessage = document.getElementById('popupMessage');
    popupMessage.textContent = message;
    popupContainer.style.display = 'flex';
}

// Function to hide the popup
function hidePopup() {
    const popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = 'none';
}

// Close button click event
document.getElementById('closePopup').addEventListener('click', hidePopup);




// Function to get a viewing by its ID from the data
function getViewById(viewingId) {
    // Return the Promise from the fetch request
    return fetch(`http://localhost:8080/viewing/${viewingId}`)
        .then(response => response.json());
}

// Call the getMovies function when the page loads
window.addEventListener('load', getMovies);
