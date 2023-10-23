
const amountInput = document.getElementById("amount")
const seatContainer = document.getElementById('seat-container');

let selectedAmount = 0;

// click on buy ticket submit button
document.getElementById("buy-tickets").addEventListener("click", async () => {
    const selectedSeats = [];
    const rows = document.querySelectorAll( 'div#seat-container div.row' )
    for ( let rowIndex= 0; rowIndex < rows.length; ++rowIndex ) {
        const columns = rows[rowIndex].querySelectorAll( 'i' );
        for ( let columnIndex = 0; columnIndex < columns.length; ++columnIndex ) {
            const seat = columns[columnIndex];
            if ( seat.classList.contains( 'selected' ) ) {
                selectedSeats.push([ rowIndex, columnIndex ]);
            }
        }
    }
    console.log(selectedSeats)
    const buyTicketResponse = await fetch("http://localhost:8080/ticket", {
       method: "POST",
       headers: {
           "Content-type": "application/json",
       },
       body: JSON.stringify({
           "selectedSeats": selectedSeats
       }),
    });
    if (!buyTicketResponse.ok) {
       console.error(`Error creating a ticket: status not ok: ${ buyTicketResponse.status }`);
       return;
    }
    try {
       const parsed_response = await buyTicketResponse.json();
       console.log(`Ticket created: ${ parsed_response }`);
    } catch (e) {
       console.error(`Error creating a ticket: failed to parse response ${ await buyTicketResponse.text() }`);
    }
});


seatContainer.addEventListener("click", function (event) {
    const seat = event.target;
    if (!seat.classList.contains('fa-square')) return;
    seat.classList.toggle('selected');

    selectedAmount = document.querySelectorAll('.selected').length;
    amountInput.value = selectedAmount;
})

function fetchData(url) {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error(`Error fetching data from ${url}: ${error.message}`);
        });
}

    /*
  const url = "http://localhost:8080/ticket";

  const ticketAmount = parseInt(document.getElementById("amount").value);
  
  const viewingDate = getSelection()

  let user;
  let seat;
  let row;
  let viewing;
  
  const requestBody = {
    user: user,
    amount: ticketAmount,
    viewing: viewing,
    seat: seat,
    row: row
  };
  
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to create a ticket");
      }
    })
    .then((data) => {
      console.log("Ticket created:", data);
    })
    .catch((error) => {
      console.error("Error creating a ticket:", error);
    });
  console.log(JSON.stringify(requestBody));
})

     */


// only select the amount tickets user input
function updateSelectedSquares() {
  const seats = document.querySelectorAll('.fa-square');
  
  seats.forEach((seat, index) => {
    if (index < selectedAmount) {
      seat.classList.add('selected');
    } else {
      seat.classList.remove('selected');
    }
  });
}

// cinema hall for rows and seats
const numRows = 20;
const numSeatsPerRow = 14;

for (let row = 0; row < numRows; row++) {
  const rowElement = document.createElement('div');
  rowElement.className = 'row';

  for (let seat = 0; seat < numSeatsPerRow; seat++) {
    const square = document.createElement('i');
    square.className = 'fa-solid fa-square fa-2x';
    rowElement.appendChild(square);
  }

  seatContainer.appendChild(rowElement);
}


// check if seat already booked
function pageLoad() {
    /*
  user = "http://localhost:8080/user/1";
  seat = "http://localhost:8080/seats";
  row = "http://localhost:8080/seat-rows";
  viewing = "http://localhost:8080/viewing/1"
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${url}: ${error.message}`);
    }
  }
  fetchData(userUrl)
    .then((userData) => {
      user = userData;
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    })
  
  fetchData(seatUrl)
    .then((seatData) => {
      seat = seatData;
    })
    .catch((error) => {
      console.error('Error fetching seat data:', error);
    });

  fetchData(rowUrl)
    .then((rowData) => {
      row = rowData;
    })
    .catch((error) => {
      console.error('Error fetching row data:', error);
    });
  fetchData(viewingUrl)
    .then((viewingData) => {
      viewing = viewingData;
    })
    .catch((error) => {
      console.error('Error fetching viewing data:', error);
    })

     */
}


// change color when clicking on seat
function toggleSeatColor(event) {
  event.target.classList.toggle('changeColorOnClick');
}

const seats = document.querySelectorAll('.fa-square');
seats.forEach(seat => {
  seat.addEventListener('click', toggleSeatColor);
});
// Function to parse query parameters from the URL
function getQueryParameter(parameterName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameterName);
}

window.onload = function () {
    // Retrieve the selected movie details from session storage
    const selectedMovieInfo = sessionStorage.getItem('selectedMovie');

    if (selectedMovieInfo) {
        // Parse the JSON data and display the movie details
        const selectedMovie = JSON.parse(selectedMovieInfo);

        // Update the page with the selected movie's title and poster URL
        const movieTitleElement = document.querySelector('.movie-title');
        movieTitleElement.textContent = selectedMovie.title;

        const moviePoster = document.getElementById('movie-poster');
        moviePoster.src = selectedMovie.posterUrl; // Set the poster image URL

        const dateAndTimeElement = document.querySelector('.date-time');
        dateAndTimeElement.textContent = formatDateInDanish(new Date(selectedMovie.date));
    }
};

function formatDateInDanish(date) {
    // Your date formatting code here
    // For example:
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('da-DK', options).toUpperCase();
}



