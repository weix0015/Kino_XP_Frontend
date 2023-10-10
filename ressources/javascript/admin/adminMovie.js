// Function to fetch data from the backend and populate the table
function fetchDataAndPopulateTable() {
    fetch("URL_TIL_DIN_BACKEND_ENDPOINT") // Erstat med den faktiske URL til din backend-endpoint
        .then(response => response.json())
        .then(data => {
            const movieTableBody = document.getElementById("movieTableBody");
            movieTableBody.innerHTML = ""; // Tøm tabellen, hvis der allerede er data i den

            data.forEach(movie => {
                const row = document.createElement("tr");

                const titleCell = document.createElement("td");
                titleCell.textContent = movie.title;
                row.appendChild(titleCell);

                const genreCell = document.createElement("td");
                genreCell.textContent = movie.genre;
                row.appendChild(genreCell);

                const showLengthCell = document.createElement("td");
                showLengthCell.textContent = movie.showLength;
                row.appendChild(showLengthCell);

                const ageCell = document.createElement("td");
                ageCell.textContent = movie.age;
                row.appendChild(ageCell);

                const posterUrlCell = document.createElement("td");
                const posterImage = document.createElement("img");
                posterImage.src = movie.posterUrl;
                posterImage.alt = movie.title;
                posterImage.className = "movie-poster"; // Tilføj en klasse til billedet for styling
                posterUrlCell.appendChild(posterImage);
                row.appendChild(posterUrlCell);

                movieTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
}

// Kald funktionen for at hente og udfylde tabellen, når siden indlæses
window.onload = fetchDataAndPopulateTable;