const baseURL = "https://rocky-meadow-63932.herokuapp.com";

document.addEventListener('DOMContentLoaded', () => {
  renderPage();
});

const renderPage = () => {
  axios.get(`${baseURL}/posts`)
  .then(allPosts => {
    if (allPosts.data.result.length > 0) {
      const blog = document.querySelector("#blog");
      const listGroup = document.querySelector(".list-group");
      blog.style.display = "block";

      allPosts.data.result.forEach((post, index) => {
        let anchor = document.createElement("a");
        anchor.classList.add("list-group-item", "list-group-item-action");
        anchor.setAttribute("href", `#/posts/${post.id}`);
        anchor.textContent = post.title;
        anchor.addEventListener("click", showPost)

        // make first post active
        if (index === 0) {
          anchor.classList.add("active");
          let blogTitle = document.querySelector("#blog-title");
          let blogContent = document.querySelector("#blog-content");
          let updatePost = document.querySelector("#edit-post");
          let deletePost = document.querySelector("#delete-post");

          // add first post title and content to view title and content
          blogTitle.textContent = post.title;
          blogContent.textContent = post.content;
          updatePost.href = `#/posts/${post.id}`;
          deletePost.href = `#/posts/${post.id}`;
        }

        listGroup.appendChild(anchor);
      })
    }
  });
};

// This line will be replaced by adding the onclick handler when the sidebar links are generated, above
const showPost = (event) => {
  event.preventDefault();
  // remove active highlight on previous blog focus to newly active highlight blog on click
  document.querySelector("#sidebar").querySelector(".active").classList.remove("active");

  // make the form and alert display none if clicking on the sidebar
  const alert = document.querySelector(".alert");
  const postView = document.querySelector("#post-form");
  const updateView = document.querySelector("#update-form");
  const blog = document.querySelector("#blog");
  alert.style.display = "none";
  postView.style.display = "none";
  updateView.style.display = "none";
  blog.style.display = "block";

  // find id from href in a link
  let sidebarTab = event.target;
  sidebarTab.classList.add("active");
  let url = sidebarTab.href.split("/posts/");
  let id = url[1];

  // get a post by id
  axios.get(`${baseURL}/posts/${id}`)
  .then(result => {
    let blogTitle = document.querySelector("#blog-title");
    let blogContent = document.querySelector("#blog-content");
    let updatePost = document.querySelector("#edit-post");
    let deletePost = document.querySelector("#delete-post");

    // add first post title and content to view title and content
    blogTitle.textContent = result.data.result.title;
    blogContent.textContent = result.data.result.content;
    updatePost.href = `#/posts/${result.data.result.id}`;
    deletePost.href = `#/posts/${result.data.result.id}`;
  })
  .catch(error => {
    console.log(error.response.data.error);
  });
};
