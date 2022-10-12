const inputBtnSubmit = document.querySelector(".input_btn_submit");
const feedContent = document.querySelector(".feed-content");
const postForm = document.querySelector(".post_form");
const baseUrl = "https://nf-api.onrender.com/api/v1";

inputBtnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("inne i eventlistner2");
  const inputHeadline = document.querySelector(".input_headline").value;
  const inputBody = document.querySelector(".input_body").value;
  const inputImage = document.querySelector(".input_image").value;
  const entry = {
    title: inputHeadline,
    body: inputBody,
    media: inputImage,
  };
  async function createEntry(endpoint) {
    try {
      const request = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(entry),
      });
      const results = await request.json();
      console.log("This is the " + results);
    } catch (e) {
      console.log(e);
    }
  }
  createEntry("/social/posts");
});
