let movieData;


// Function to fetch and display movies
async function getMovies() {
    try {
        const response = await fetch("http://localhost:8080/movies");
        movieData = await response.json();
        const movieList = document.getElementById("movieList");
        movieList.innerHTML = ''; // Clear the movieList

        for (const movie of movieData) {
            const movieCard = createMovieCard(movie);

            movieList.appendChild(movieCard);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Function to create a movie card element
function createMovieCard(movie) {
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

        const showtimesContainer = document.createElement("div");
        showtimesContainer.className = "showtimes-container";

        // Fetch all viewings and sort them by date
        movie.viewing_ids.map(async (viewingId) => {
            // Fetch the viewing data (you can use fetch or any other method here)
            const response = await fetch(`http://localhost:8080/viewing/${viewingId}`);
            const viewing = await response.json();

            // Create a showtime button and add it to the showtimesContainer
            const showtimeButton = document.createElement("button");
            showtimeButton.className = "btn btn-primary mr-2"; // Use Bootstrap classes

            // Check and format the date here, ensure it's in a valid format
            showtimeButton.textContent = formatDateInDanish(new Date(viewing.showTime));

            showtimeButton.addEventListener('click', function() {
                window.location.href = 'booking.html'; // Ændr stien efter behov
            });

            showtimesContainer.appendChild(showtimeButton);
        });

        // Sort viewings by date (if needed)
        movie.viewing_ids.sort((a, b) => new Date(a.showTime) - new Date(b.showTime));

        titleShowtimesContainer.appendChild(titleContainer);
        titleShowtimesContainer.appendChild(showtimesContainer);
    }
    if (movie.title === "Morbius") {
        movieTitle.textContent = "Morbin Times";
    }

    // Add click event listener to the movieCard
    movieCard.addEventListener('click', function () {
        // Store the selected movie's details in the session storage
        sessionStorage.setItem('selectedMovie', JSON.stringify(movie));

        // Redirect to the booking page
        window.location.href = 'booking.html';
    });

    movieCard.appendChild(posterContainer);
    movieCard.appendChild(titleShowtimesContainer);

    return movieCard;
}

// Call the getMovies function when the page loads
window.addEventListener('load', getMovies);

// Function to update the movie display
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

        // Check if the movie has viewing_ids
        if (movie.viewing_ids !== null) {
            movieTitle.textContent += " Show Times";
        }
        // Special condition for a movie title
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
// Function to format a date in Danish
function formatDateInDanish(date) {
    // Format options for the date
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    };
    // Convert date to Danish format and make it uppercase
    const danishDate = date.toLocaleDateString('da-DK', options);
    const uppercaseDanishDate = danishDate.toUpperCase();
    return uppercaseDanishDate;
}
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

// Function to clear the date filter
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

// Add event listeners for search functionality
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', performSearch);
const searchInput = document.getElementById('search');
const suggestionList = document.getElementById('suggestions');

searchInput.addEventListener('input', displaySuggestions);

// Function to display search suggestions
function displaySuggestions() {
    const searchInputValue = searchInput.value.trim().toLowerCase();
    suggestionList.innerHTML = ''; // Clear existing suggestions

    if (searchInputValue.length < 1) {
        return; // Don't show suggestions if the search input is empty
    }

    // Filter movie titles that match the input
    const matchingMovies = movieData.filter(movie => movie.title.toLowerCase().includes(searchInputValue));

    // Display up to, let's say, 5 suggestions
    const maxSuggestions = 5;
    for (let i = 0; i < matchingMovies.length && i < maxSuggestions; i++) {
        const suggestion = document.createElement('li');
        suggestion.textContent = matchingMovies[i].title;

        suggestion.addEventListener('click', () => {
            // When a suggestion is clicked, populate the search input with that suggestion and perform the search
            searchInput.value = matchingMovies[i].title;
            performSearch();
        });

        suggestionList.appendChild(suggestion);
    }
}

// Function to perform the search
function performSearch() {
    const searchInput = document.getElementById('search').value;
    // Use the search input to filter the movieData
    const filteredMovies = movieData.filter(movie => movie.title.toLowerCase().includes(searchInput.toLowerCase()));

    // Update the movie list to display the filtered movies
    updateMovieDisplay(filteredMovies);

    // Clear the search input
    document.getElementById('search').value = '';
}

// Function to get a viewing by its ID from the data
function getViewById(viewingId) {
    // Return the Promise from the fetch request
    return fetch(`http://localhost:8080/viewing/${viewingId}`)
        .then(response => response.json());
}

showtimeButton.addEventListener('click', function() {
    // Get the selected movie's details
    const selectedMovie = movie; // Replace this with the actual movie details

    // Encode the movie details as a JSON string and include it in the URL
    const selectedMovieInfo = encodeURIComponent(JSON.stringify(selectedMovie));

    // Redirect to the booking page with the selected movie's details
    window.location.href = `booking.html?movie=${selectedMovieInfo}`;
});


