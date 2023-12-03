const logoutBtn = document.querySelector("#logout-button");

const logOutUser = async (event) => {
    event.preventDefault();

    const confirmation = confirm('Do you want to log out?');
    if (!confirmation) {
        return;
    }
    console.log('logout request')
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/');
    }
    else {
        alert(response.statusText);
    }
}

logoutBtn.addEventListener('click', logOutUser);