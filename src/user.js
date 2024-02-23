// Función para obtener el nombre de usuario de la URL
function getUsernameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('username');
}

// Función para mostrar el nombre de usuario en la barra superior
function displayUsername() {
    const username = getUsernameFromURL();
    const usernameDisplay = document.getElementById('username-display');
    if (username) {
        usernameDisplay.innerHTML = `
            <p class="welcomeUser" style="margin: 15px 0 15px 0;" >Bienvenido ${username}</p>
        `;
    } else {
        usernameDisplay.innerHTML = `
            <p class="welcomeUser" style="margin: 15px 0 15px 0;">Bienvenido usuario</p>
        `;
    }
}

// Llama a la función para mostrar el nombre de usuario cuando la página se carga
window.onload = displayUsername;