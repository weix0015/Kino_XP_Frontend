document.addEventListener('DOMContentLoaded', function () {
  let loginButton = document.querySelector('.login-button');
  let loginModal = document.getElementById('login-modal');
  let modal = new bootstrap.Modal(loginModal);

  loginButton.addEventListener('click', function () {
    modal.show();
  })
})

const seatContainer = document.getElementById('seat-container');

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

function pageLoad() {
  const responseEntities = [];
  const fetchAndStoreResponse = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      responseEntities.push(data);
    } catch (error) {
      console.error(`Error fetching ${url}: ${error.message}`);
    }
  }

  const fetchPromises = urls.map(fetchAndStoreResponse);

  Promise.all(fetchPromises)
    .then(() => {
      console.log('All requests have been completed.')
      console.log('Response entities:', responseEntities)
    })
    .catch((error) => {
      console.error('Error fetching one or more URLs:', error)
    });
}


function toggleSeatColor(event) {
  event.target.classList.toggle('changeColorOnClick');
}

const seats = document.querySelectorAll('.fa-square');
seats.forEach(seat => {
  seat.addEventListener('click', toggleSeatColor);
});