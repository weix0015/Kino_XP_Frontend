const login = "http://localhost:8080/login";
const registration = "http://localhost:8080/user";
const loginForm = document.getElementById("loginForm");
const registrationForm = document.getElementById("registrationForm");
const toggleFormText = document.getElementById("toggleFormText");

function performLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userData = {
    email: email,
    password: password
  };

  fetch(login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
      .then(response => {
        if (response.ok) {
          console.log("Login successful");
          window.location.href = "index.html";
        } else {
          console.error("Login failed, Please try again");
        }
      })
      .catch(error => {
        console.error("An error occurred:", error);
      });
}

function performRegistration() {
  const name = document.getElementById("name").value;
  const newEmail = document.getElementById("newEmail").value;
  const newPassword = document.getElementById("newPassword").value;
  const admin = null;

  const userData = {
    name: name,
    email: newEmail,
    password: newPassword,
    admin
  };

  fetch(registration, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
      .then(response => {
        if (response.ok) {
          console.log("Registration successful");
          // After successful registration, switch to the login form
          loginForm.style.display = "block";
          registrationForm.style.display = "none";
          toggleFormText.innerText = "Already a User? Login here";
        } else {
          console.error("Registration failed, Please try again");
        }
      })
      .catch(error => {
        console.error("An error occurred:", error);
      });
}

toggleFormText.addEventListener("click", () => {
  if (loginForm.style.display === "none") {
    // Switching to the registration form
    loginForm.style.display = "block";
    registrationForm.style.display = "none";
    toggleFormText.innerText = "Not a member yet, create user here";
  } else {
    // Switching to the login form
    loginForm.style.display = "none";
    registrationForm.style.display = "block";
    toggleFormText.innerText = "Already a User? Login here";
  }
});

const loginButton = document.getElementById("btn-save");
loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  performLogin();
});

const registerButton = document.getElementById("btn-register");
registerButton.addEventListener("click", (event) => {
  event.preventDefault();
  performRegistration();
});
