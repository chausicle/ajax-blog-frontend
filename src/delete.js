document.querySelector("#delete-post").addEventListener("click", (event) => {
  // find id from href in edit link
  let url = event.target.href.split("/posts/")
  let id = url[1];

  axios.delete(`${baseURL}/posts/${id}`)
  .then(result => {
    console.log(result);
    window.location.reload(true);
  })
  .catch(error => {
    console.log(error.response.data.error);
  })
})
