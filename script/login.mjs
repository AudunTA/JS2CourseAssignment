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
