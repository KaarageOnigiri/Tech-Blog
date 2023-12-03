const postComment = async (event) => {
    event.preventDefault();

    const post_id = parseInt(document.querySelector('.blogpost-title').getAttribute('data'));
    const comment_text = document.querySelector('#typed-comment').value.trim();
    console.log(post_id, comment_text);
    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({comment_text, blogpost_id: post_id}),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace(`/post/${post_id}`);
    }
    else {
        console.log(response.statusText);
        alert('Failed to create comment, Try again next time.');
    }
}

document.querySelector("#add-comment-form").addEventListener('submit', postComment);