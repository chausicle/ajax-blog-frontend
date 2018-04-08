document.querySelector("#create-post").addEventListener("click", (event) => {
  const blog = document.querySelector("#blog");
  const postView = document.querySelector("#post-form");
  const updateView = document.querySelector("#update-form");

  // hide blog window and show the create a post form
  blog.style.display = "none";
  updateView.style.display = "none";
  postView.style.display = "inline";
});

document.querySelector("#post-button").addEventListener("click", (event) => {
  const postView = document.querySelector("#post-form");
  const postTitle = postView.querySelector("#post-title");
  const postContent = postView.querySelector("#post-content");

  axios.post(`${baseURL}/posts`, {
    title: postTitle.value,
    content: postContent.value
  })
  .then(result => {
    let alert = document.querySelector(".alert");

    // make the form and alert display none when a new post is successfully created
    alert.style.display = "none";
    postView.style.display = "none";

    // reload page to get new content to show
    location.assign("index.html");
  })
  .catch(error => {
    console.log(error.response.data);
    // error response
    let alert = document.querySelector(".alert");
    const response = error.response.data.error;

    // apply error messages to alert text content
    alert.textContent = response.message;
    response.errors.forEach((error, index, array) => {
      if (index === array.length - 1) alert.textContent += `${error}`;
      else alert.textContent += `${error}, `;
    })
    alert.style.display = "block";
  });
});
