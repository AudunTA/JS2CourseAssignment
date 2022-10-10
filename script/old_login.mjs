const form = document.querySelector("#login-form");
const email = document.querySelector("#femail");
const password = document.querySelector("#fpassword");
const firstNameError = document.querySelector("#firstNameError");
const validation = document.querySelector(".validationMessage");
const url = "https://nf-api.onrender.com/api/v1";
const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaWF0IjoxNjY0MjcyMjkzfQ.4M7-5-Rq8puXmvlTkQgw0ecUXEjvamfba89BRE1tXgk",
    },
  };
  

form.addEventListener("submit", handleSubmit);

function handleSubmit() {

    event.preventDefault();

    if((validateEmail(email.value) === true) && (email.value.length > 5)) {
        emailError.style.display = "none";
        console.log("inne");

    } else {

        emailError.innerHTML = `Please enter a valid email address.`;
        emailError.style.display = "block";
    }
    //this checks if eveything is fine and will give the user a validation for the sent form
    console.log(email.value.length > 0);
    if(validateEmail(email.value)) {
        console.log("JAAA");
        validation.innerHTML = `<h2>the form has been sent</h2>`;
        handleAPIFriends(email.value, password.value);


    } else {
        //if the user tries to resend after getting a valdation i remove the validation if the information is not correct.
        validation.innerHTML = ``;
    }
}

//check lenght function tha's called further up.
function checkLen(value, len) {
    if(value.trim().length > len)   {
        //if the value.trim (removes spaces) is longer than the lenght it will return true.
        console.log("true");
        return true;
    }
    else {
        //return false if not right.
        return false;
    }
}

//regex for email validation
function validateEmail(email) {
    console.log(email);
    const regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    const matching = regEx.test(email);
    console.log(matching);
    //returns true or false
    return matching;
}

async function handleAPIFriends(email, password) {
    try {
         console.log(email, password);
    const data = JSON.stringify( {
        email: email,
        password: password,
      });
      console.log(data);
    const response = await fetch(
        `${url}/social/auth/login`, {
            method: 'post',
            headers: {
                'content-Type': 'application/json',
              },
        body: data,
            });
      const result = await response.json();
      console.log(result);

      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('email', result.email);
      localStorage.setItem('username', result.name);


    } catch(e) {
        console.log(e);
    }
    finally {
        window.location.assign("apitest.html");

    }
   
      
}