const email = document.querySelector(".input_email");
const password = document.querySelector(".input_password");
const loginForm = document.querySelector(".login_form");
const errorContainer = document.querySelector(".error_container");

const baseUrl = "https://nf-api.onrender.com/api/v1";

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector(".input_email").value;
  const password = document.querySelector(".input_password").value;
  const user = {
    email: email,
    password: password,
  };

  async function login(endpoint) {
    try {
      const request = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(user),
      });
      const results = await request.json();
      console.log(results);

      if (request.status === 200) {
        window.location.href = "feed.html";
        localStorage.setItem("accessToken", results.accessToken);
        localStorage.setItem("email", results.email);
        localStorage.setItem("name", results.name);
        localStorage.setItem("id", results.id);
      } else {
        errorContainer.innerHTML = `<p>Wrong username or password</p>`;
      }
    } catch (e) {
      console.log(e);
    }
  }
  login("/social/auth/login");
});

//------------------------------- Create user -----------------------------

const headline = document.querySelector(".headline");
const createAccount = document.querySelector(".create_account");
const createAccForm = document.querySelector(".create-acc-form");

createAccount.addEventListener("click", (e) => {
  e.preventDefault();
  headline.innerHTML = "<h1>Create Account</h1>";
  createAccount.classList.remove("username");
});

createAccForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector(".input_email").value;
  const password = document.querySelector(".input_password").value;
  const userName = document.querySelector(".input_username").value;
  const user = {
    name: userName,
    email: email,
    password: password,
  };
  console.log(email, password, userName);

  async function register(endpoint) {
    try {
      const request = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(user),
      });
      const results = await request.json();
      console.log(results);
      console.log(request.status);
    } catch (e) {
      console.log("this is the error:" + e);
    }
  }
  register("/social/auth/register");
});
