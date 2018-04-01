const baseURL = `http://localhost:3000`

document.addEventListener('DOMContentLoaded', () => {
  renderPage();
});

const renderPage = () => {
  axios.get(`${baseURL}/posts`)
  .then(allPosts => {
    console.log(allPosts.data.result);

// <a class="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
    const listGroup = document.querySelector(".list-group");
    allPosts.data.result.forEach((post, index) => {
      console.log(post);
      let anchor = document.createElement("a");
      anchor.classList.add("list-group-item", "list-group-item-action");
      anchor.setAttribute("href", `#/posts/${post.id}`);
      anchor.textContent = post.title;

      if (index === 0) {
        anchor.classList.add("active");

      }


      listGroup.appendChild(anchor);
    });
  })
};
