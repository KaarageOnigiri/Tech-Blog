const editPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#edit-post-title').value.trim();
    const content = document.querySelector('#edit-post-content').value.trim();
    const id = parseInt(document.querySelector('#edit-post-form').getAttribute('data'));

    console.log(id, title, content);

    if (!title) {
        alert('Please fill something in the Title');
        return;
    }

    if (title && content.length > 10) {
        console.log('edit post request')
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({title, content}),
            headers: {'Content-Type': 'application/json'}
        });
        console.log(response);
        if (response.ok) {
            document.location.replace(`/post/${id}`);
        }
        else {
            console.log(response.statusText);
            alert('Sorry, failed to update post.');
        }
    }
    else {
        alert('Content needs to have at least 10 characters');
    }
}

document.querySelector('#edit-post-form').addEventListener('submit', editPost);