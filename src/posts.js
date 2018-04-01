document.querySelector("#create-post").addEventListener("click", (event) => {
  const blog = document.querySelector("#blog");
  const formView = document.querySelector("#post-form");

  // hide blog window and show the create a post form
  blog.style.display = "none";
  formView.style.display = "inline";
});

document.querySelector("button[type='submit']").addEventListener("click", (event) => {
  console.log(event);
  const formView = document.querySelector("#post-form");
  const title = formView.querySelector("#title");
  const content = formView.querySelector("#content");

  axios.post(`/posts/new`, {
    title: title.value,
    content: content.value
  })
  .then(result => {
    let alert = document.querySelector(".alert");

    // make the form and alert display none when a new post is successfully created
    alert.style.display = "none";
    formView.style.display = "none";

    // reload page to get new content to show
    window.location.reload(true);
  })
  .catch(error => {
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