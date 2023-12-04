const createNewPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-post-title').value.trim();
    const content = document.querySelector('#new-post-content').value.trim();

    console.log(title, content);

    if (!title) {
        alert('Please fill in the Title');
        return;
    }

    if (title && content.length > 10) {
        console.log('create post request')
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({title, content}),
            headers: {'Content-Type': 'application/json'}
        });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            console.log(response.statusText);
            alert('Sorry, failed to create new post.');
        }
    }
    else {
        alert('Content needs to have at least 10 characters');
    }
}


document.querySelector('#new-post-form').addEventListener('submit', createNewPost);
