const title = document.querySelectorAll(".blogpost-title");

const redirectToPostID = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute("data");
    console.log(id);

    const response = await fetch(`/post/${id}`, {
        method: 'GET'
    });

    if (response.ok) {
        document.location.replace(`/post/${id}`);
    }
}

title.forEach((num) => num.addEventListener('click', redirectToPostID));