const seatContainer = document.getElementById('seat-container');

const numRows = 20;
const numSeatsPerRow = 14;

for (let row = 0; row < numRows; row++) {
  const rowElement = document.createElement('div');
  rowElement.className = 'row';

  for (let seat = 0; seat < numSeatsPerRow; seat++) {
    const square = document.createElement('i');
    square.className = 'fa-solid fa-square';
    rowElement.appendChild(square);
  }

  seatContainer.appendChild(rowElement);
}

function toggleSeatColor(event) {
  event.target.classList.toggle('blue');
}

const seats = document.querySelectorAll('.fa-square');
seats.forEach(seat => {
  seat.addEventListener('click', toggleSeatColor);
});