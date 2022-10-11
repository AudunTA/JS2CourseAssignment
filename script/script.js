var removeClass = document.querySelector(".testing");

window.onresize = function () {
  console.log("test");
  if (window.innerWidth <= 990)
    removeClass.classList.add("flex-column-reverse");
  else removeClass.classList.remove("flex-column-reverse");
};

const container = document.querySelector(".container-content");
const url = "https://nf-api.onrender.com/api/v1";
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaWF0IjoxNjY0MjcyMjkzfQ.4M7-5-Rq8puXmvlTkQgw0ecUXEjvamfba89BRE1tXgk",
  },
};
async function handleAPI() {
  try {
   
    const response = await fetch(
      `${url}/social/posts/?_author=true&_comments=true&_reactions=true`,
      options
    );
    const result = await response.json();
    for (let i = 0; i < result.length; i++) {
      let avatar = result[i].author.avatar;

      if (result[i].author.avatar === "") {
        avatar =
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50";

      }

      container.innerHTML += `<div class="feed-content rounded">

            <div class="d-flex">
<img src="${avatar}" id="feed-profile-pic" />
<div class="div">
  <p class="text-start p-feed ms-3">${result[i].author.name}</p>
  <p class="text-start p-feed ms-3">Front-end developer</p>
</div>

</div>
<img src="${result[i].media}" id="feed-picture">

<div class="text-end">
<p>${result[i]._count.comments} comments</p>
</div>
</div>`;
    }
  } catch (e) {}
}
handleAPI();


async function api() {
  try{
      console.log("TEST");
      const response = await fetch(
        `${url}/social/posts/`,
        options
      );

      const result = await response.json();
      console.log(result);
      console.log(result.length);
      for(let i = 0; result.length; i++) {
          console.log(result[i].title);
      }

  }
  catch(e){
      //console.log(e);
  }
}

api();