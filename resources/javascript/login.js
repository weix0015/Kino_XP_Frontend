const login = "http://localhost:8080/login";
const loginForm=document.getElementById("loginForm")
loginForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    performLogin();
})
// Function to perform login
function performLogin() {
    const email = document.getElementById("email").value;
    console.log(email)
    const password = document.getElementById("password").value;
    console.log(password)

    // Create an object with the username and password
    const userData = {
        email: email,
        password: password
    };

    // Send a POST request to the server
    fetch(login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.ok) {
                // Successful login, you can handle it here
                console.log("Login successful");
                window.location.href="../templates.Home/index.html";
            } else {
                // Handle login failure, display an error message or take appropriate action
                console.error("Login failed, Please try again");
            }

        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
}

// Add event listener to the login form submit button
const loginButton = document.getElementById("btn-save");
loginButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission
    performLogin(); // Call the login function
});
