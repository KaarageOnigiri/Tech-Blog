const title = document.querySelectorAll(".blogpost-title");

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

document.querySelector('#add-new-post').addEventListener('click', addNewPost);

title.forEach((num) => num.addEventListener('click', redirectToPostID));