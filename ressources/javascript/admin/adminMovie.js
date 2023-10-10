
function createButton(text, className, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className;
    button.addEventListener("click", clickHandler);
    return button;
}

function fetchDataAndPopulateTable() {
    fetch("http://localhost:8080/movies")
        .then(response => response.json())
        .then(data => {
            const movieTableBody = document.getElementById("movieTableBody");
            movieTableBody.innerHTML = ""; // Tøm tabellen, hvis der allerede er data i den

            data.forEach(movie => {
                const row = document.createElement("tr");

                // Datakolonner
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

                // Knapperkolonne
                const buttonsCell = document.createElement("td");

                // Opret "Gem" knap med en click-handler
                const saveButton = createButton("Gem", "save-button", () => {
                    // Implementer din "Gem" logik her, f.eks. ved at kalde din backend
                    console.log("Gem blev klikket for film med ID: " + movie.id);
                });
                buttonsCell.appendChild(saveButton);

                // Opret "Slet" knap med en click-handler
                const deleteButton = createButton("Slet", "delete-button", () => {
                    // Implementer din "Slet" logik her, f.eks. ved at kalde din backend
                    console.log("Slet blev klikket for film med ID: " + movie.id);
                });
                buttonsCell.appendChild(deleteButton);

                // Opret "Rediger" knap med en click-handler
                const editButton = createButton("Rediger", "edit-button", () => {
                    // Implementer din "Rediger" logik her, f.eks. ved at omdirigere til en redigeringsformular
                    console.log("Rediger blev klikket for film med ID: " + movie.id);
                });
                buttonsCell.appendChild(editButton);

                row.appendChild(buttonsCell);

                movieTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
}

window.onload = fetchDataAndPopulateTable();
