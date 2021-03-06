document.querySelector("#edit-post").addEventListener("click", (event) => {
  event.preventDefault();
  const blog = document.querySelector("#blog");
  const updateView = document.querySelector("#update-form");

  // hide blog window and show the create a post form
  blog.style.display = "none";
  updateView.style.display = "inline";

  // find id from href in edit link
  let url = event.target.href.split("/posts/");
  let id = url[1];

  // get a post by id
  axios.get(`${baseURL}/posts/${id}`)
  .then(result => {
    const updateTitle = updateView.querySelector("#update-title");
    const updateContent = updateView.querySelector("#update-content");

    // assign existing data to title and content
    updateTitle.value = result.data.result.title;
    updateContent.value = result.data.result.content;
  })
  .catch(error => {
    console.log(error.response.data.error);
  });
})

document.querySelector("#update-button").addEventListener("click", (event) => {
  event.preventDefault();
  const updateView = document.querySelector("#update-form");
  const updateTitle = updateView.querySelector("#update-title");
  const updateContent = updateView.querySelector("#update-content");
  const activeTab = document.querySelector(".active");

  // find id from href
  let url = window.location.href.split("/posts/");
  let id = url[1].split("/edit")[0];

  console.log(url);
  // update existing post with new title and content
  axios.put(`${baseURL}/posts/${id}`, {
    title: updateTitle.value,
    content: updateContent.value
  })
  .then(result => {
    let alert = document.querySelector(".alert");

    // make the form and alert display none when a new post is successfully created
    alert.style.display = "none";
    updateView.style.display = "none";

    // reload page to get new content to show
    location.assign("index.html");
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
