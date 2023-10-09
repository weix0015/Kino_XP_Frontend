// Get the seat container
const seatContainer = document.getElementById('seat-container');

// Define the number of rows and seats
const numRows = 20;
const numSeatsPerRow = 14;

// Loop to create the rows
for (let row = 0; row < numRows; row++) {
  const rowElement = document.createElement('div');
  rowElement.className = 'row';

  // Loop to create the seats in each row
  for (let seat = 0; seat < numSeatsPerRow; seat++) {
    const square = document.createElement('i');
    square.className = 'fa-solid fa-square';
    rowElement.appendChild(square);
  }

  seatContainer.appendChild(rowElement);
}

// Function to toggle the color of a square
function toggleSeatColor(event) {
  event.target.classList.toggle('blue');
}

// Add a click event listener to all seats
const seats = document.querySelectorAll('.fa-square');
seats.forEach(seat => {
  seat.addEventListener('click', toggleSeatColor);
});