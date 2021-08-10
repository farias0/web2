const tokenStorageKey = "token"

const login = async () => {
    hideErrors()

    const username = document.getElementById('usernameInput').value
    const password = document.getElementById('passwordInput').value

    try {
        const response = await backend.login(username, password)
        const token = response.token
        window.localStorage.setItem(tokenStorageKey, token)

    } catch (error) {
        switch(error.response.status) {
            case 404:
                document.getElementById('userNotFound').style.display = "block"
                break
            case 401:
                document.getElementById('wrongPassword').style.display = "block"
                break
            default:
                document.getElementById('internalError').style.display = "block"
        }
    }
}

function init() {
    hideErrors()
    document.getElementById('loginButton').onclick=()=>{ login() }
}

function hideErrors() {
    document.getElementById('userNotFound').style.display = "none"
    document.getElementById('wrongPassword').style.display = "none"
    document.getElementById('internalError').style.display = "none"
}

window.onload = init