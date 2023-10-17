

document.addEventListener('DOMContentLoaded', function() {

    let movieButton1 = document.querySelector('.movieButton1');

    if (movieButton1) {
        movieButton1.addEventListener('click', function() {

            window.location.href = 'templates.Home/admin/adminMovie.html';
        });
    }
});
