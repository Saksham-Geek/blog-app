document.addEventListener("DOMContentLoaded", () => {
  const blogForm = document.getElementById("blogForm");
  const titleInput = document.getElementById("titleInput");
  const contentInput = document.getElementById("contentInput");
  const blogContainer = document.getElementById("blogContainer");

  // Fetch and display blog posts
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        const postElement = createPostElement(post);
        blogContainer.appendChild(postElement);
      });
    });

  // Add new blog post
  blogForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = titleInput.value;
    const content = contentInput.value;

    const newPost = {
      title,
      body: content,
      userId: 1, // Assuming the user ID is 1 for simplicity
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((post) => {
        const postElement = createPostElement(post);
        blogContainer.appendChild(postElement);
        titleInput.value = "";
        contentInput.value = "";
      });
  });

  // Delete blog post
  blogContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const postId = event.target.getAttribute("data-post-id");

      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "DELETE",
      }).then(() => {
        event.target.parentNode.remove();
      });
    }
  });

  // Create a blog post element
  function createPostElement(post) {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          <button class="delete-btn" data-post-id="${post.id}">Delete</button>
        `;
    return postElement;
  }
});
