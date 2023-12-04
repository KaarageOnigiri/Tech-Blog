const title = document.querySelectorAll(".blogpost-title");
const editBtn = document.querySelectorAll(".edit-button");
const deleteBtn = document.querySelectorAll(".delete-button");

const redirectToPostID = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute("data");
    console.log(id);

    document.location.replace(`/post/${id}`);
}

const addNewPost = async (event) => {
    event.preventDefault();

    document.location.replace('/new-dashboard');
}

const editPost = async (event) => {
    event.preventDefault();

    const id = event.target.parentElement.querySelector('.is-7').querySelector('.blogpost-title').getAttribute('data');
    console.log(id);

    document.location.replace(`/edit-post/${id}`);
}

const deletePost = async (event) => {
    event.preventDefault();

    const id = event.target.parentElement.querySelector('.is-7').querySelector('.blogpost-title').getAttribute('data');
    console.log(id);

    const answer = confirm('Delete Post?');
    if (!answer) {
        return;
    }

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        console.log(response.statusText);
        alert('Failed to delete post');
      }
}

editBtn.forEach((num) => num.addEventListener('click', editPost));  
deleteBtn.forEach((num) => num.addEventListener('click', deletePost));  
document.querySelector('#add-new-post').addEventListener('click', addNewPost);
title.forEach((num) => num.addEventListener('click', redirectToPostID));

