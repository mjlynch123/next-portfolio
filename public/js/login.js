const loginForm = document.getElementById("login-form");

const login = document.getElementById("login");
const signup = document.getElementById("signup");
const guest = document.getElementById("guest");

const switchToSU = document.getElementById("sign-up");
const switchToLI = document.getElementById("log-in");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    // Redirect to a logged-in page
    window.location.href = "/";
  } else {
    const { message } = await response.json();
    alert(message);
  }
});

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      alert(response.statusText);
    }
  }
};

// * Switches between both login and signup UI's

const switchSignUp = async (event) => {
  event.preventDefault();
  login.style.display = "none";
  guest.style.display = "none";
  signup.style.display = "block";
}

const switchToLogIn = async (event) => {
  event.preventDefault();
  login.style.display = "block";
  signup.style.display = "none";
}

switchToSU.addEventListener("click", switchSignUp);
switchToLI.addEventListener("click", switchToLogIn);

document.querySelector("#login-form").addEventListener("submit", loginForm);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
