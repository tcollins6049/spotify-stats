const clientId = 'your-client-id';
const redirectUri = 'https://your-username.github.io/spotify-api-playground/';

const authEndpoint = 'https://accounts.spotify.com/authorize';
const scopes = [
    'user-library-read',
    'playlist-modify-public',
    'playlist-modify-private'
];

document.getElementById('login-button').addEventListener('click', () => {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
});

window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1).split('&').reduce((initial, item) => {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});

    if (hash.access_token) {
        fetchUserData(hash.access_token);
    }
});

function fetchUserData(token) {
    fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('content').innerHTML = `
            <h2>Welcome, ${data.display_name}</h2>
            <p>Your Spotify ID is ${data.id}</p>
        `;
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
}
