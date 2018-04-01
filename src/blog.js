document.addEventListener('DOMContentLoaded', () => {
  renderPage();
});

const renderPage = () => {
  axios.get(`/posts`)
  .then(allPosts => {
    const listGroup = document.querySelector(".list-group");

    allPosts.data.result.forEach((post, index) => {
      let anchor = document.createElement("a");
      anchor.classList.add("list-group-item", "list-group-item-action");
      anchor.setAttribute("href", `#/posts/${post.id}`);
      anchor.textContent = post.title;

      // make first post active
      if (index === 0) {
        anchor.classList.add("active");
        let blogTitle = document.querySelector("#blog-title");
        let blogContent = document.querySelector("#blog-content");

        // add first post title and content to view title and content
        blogTitle.textContent = post.title;
        blogContent.textContent = post.content;
      }

      listGroup.appendChild(anchor);
    });
  })
};

document.querySelector("#sidebar").addEventListener("click", (event) => {
  // remove active highlight on previous blog focus to newly active highlight blog on click
  document.querySelector("#sidebar").querySelector(".active").classList.remove("active");

  // make the form and alert display none if clicking on the sidebar
  const alert = document.querySelector(".alert");
  const formView = document.querySelector("#post-form");
  const blog = document.querySelector("#blog");
  alert.style.display = "none";
  formView.style.display = "none";
  blog.style.display = "block";

  // find id from href in a link
  let sidebarTab = event.target;
  sidebarTab.classList.add("active");
  let url = sidebarTab.href.split("/posts/");
  let id = url[1];

  // get a post by id
  axios.get(`/posts/${id}`)
  .then(result => {
    let blogTitle = document.querySelector("#blog-title");
    let blogContent = document.querySelector("#blog-content");

    // add first post title and content to view title and content
    blogTitle.textContent = result.data.result.title;
    blogContent.textContent = result.data.result.content;

  })
  .catch(error => {
    console.log(error.response.data.error);
  });
});
