document.querySelector("#edit-post").addEventListener("click", (event) => {
  const blog = document.querySelector("#blog");
  const formView = document.querySelector("#update-form");

  // hide blog window and show the create a post form
  blog.style.display = "none";
  formView.style.display = "inline";

  // find id from href in edit link
  let url = event.target.href.split("/posts/")
  let id = url[1].split("/edit")[0];

  // get a post by id
  axios.get(`/posts/${id}`)
  .then(result => {
    const updateTitle = formView.querySelector("#update-title");
    const updateContent = formView.querySelector("#update-content");

    // assign existing data to title and content
    updateTitle.value = result.data.result.title;
    updateContent.value = result.data.result.content;
  })
  .catch(error => {
    console.log(error.response.data.error);
  });
})

document.querySelector("#update-button").addEventListener("click", (event) => {
  const formView = document.querySelector("#update-form");
  const updateTitle = formView.querySelector("#update-title");
  const updateContent = formView.querySelector("#update-content");

  // find id from href
  let url = window.location.href.split("/posts/");
  let id = url[1].split("/edit")[0];

  // update existing post with new title and content
  axios.put(`/posts/${id}/edit`, {
    title: updateTitle.value,
    content: updateContent.value
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
