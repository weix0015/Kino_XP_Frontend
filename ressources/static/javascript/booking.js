// click on buy ticket submit button
document.getElementById("buy-tickets").addEventListener("click", function () {

  const url = "http://localhost:8080/ticket";
  const ticketAmount = parseInt(document.getElementById("amount").value);

  // Fetch user, viewing, seat, and row data here
  const userUrl = "http://localhost:8080/user/1";
  const seatUrl = "http://localhost:8080/seats";
  const rowUrl = "http://localhost:8080/seat-rows";
  const viewingUrl = "http://localhost:8080/viewing/1";
//
  Promise.all([
    fetchData(userUrl),
    fetchData(seatUrl),
    fetchData(rowUrl),
    fetchData(viewingUrl)
  ])
    .then(([userData, seatData, rowData, viewingData]) => {
      const user = userData;
      const seat = seatData;
      const row = rowData;
      const viewing = viewingData;

      const requestBody = {
        user: user,
        amount: ticketAmount,
        viewing: viewing,
        seat: seat,
        row: row
      };

      return fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
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
});

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

// cinema, seats and row
const ticketAmount = parseInt(document.getElementById("amount").value);

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

// change input number button
amountInput.addEventListener("change", function () {
  selectedAmount = parseInt(amountInput.value);
  updateSelectedSquares();
});

seatContainer.addEventListener("click", function (event) {
  const seat = event.target;
  if (seat.classList.contains('fa-square')) {
    seat.classList.toggle('selected');

    selectedAmount = document.querySelectorAll('.selected').length;
    amountInput.value = selectedAmount;
  }
})

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

// change color when clicking on seat
function toggleSeatColor(event) {
  event.target.classList.toggle('changeColorOnClick');
}

const seats = document.querySelectorAll('.fa-square');
seats.forEach(seat => {
  seat.addEventListener('click', toggleSeatColor);
});

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

const amountInput = document.getElementById("amount")
const seatContainer = document.getElementById('seat-container');

let selectedAmount = 0;

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

// change input number button
amountInput.addEventListener("change", function () {
selectedAmount = parseInt(amountInput.value);
updateSelectedSquares();
});

seatContainer.addEventListener("click", function (event) {
const seat = event.target;
if (seat.classList.contains('fa-square')) {
  seat.classList.toggle('selected');

  selectedAmount = document.querySelectorAll('.selected').length;
  amountInput.value = selectedAmount;
}
})

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
}


// change color when clicking on seat
function toggleSeatColor(event) {
event.target.classList.toggle('changeColorOnClick');
}

const seats = document.querySelectorAll('.fa-square');
seats.forEach(seat => {
seat.addEventListener('click', toggleSeatColor);
});

*/
