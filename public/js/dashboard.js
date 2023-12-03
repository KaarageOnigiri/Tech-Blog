const title = document.querySelectorAll(".blogpost-title");
const editBtn = document.querySelector("#edit-button");
const deleteBtn = document.querySelector("delete-button");

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

const editPost = (event) => {
    event.preventDefault();
}

const deletePost = (event) => {
    event.preventDefault();
}

editBtn.addEventListener('click', editPost);
deleteBtn.addEventListener('click', deletePost);
document.querySelector('#add-new-post').addEventListener('click', addNewPost);
title.forEach((num) => num.addEventListener('click', redirectToPostID));

