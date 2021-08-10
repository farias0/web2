const signup = async () => {
    hideErrors()

    const username = document.getElementById('usernameInput').value
    const email = document.getElementById('emailInput').value
    const password = document.getElementById('passwordInput').value

    try {
        await backend.signup(username, email, password)
        document.getElementById('success').style.display = "block"
        setTimeout(function() {
            window.location='../login/index.html'
        }, 3000);

    } catch (error) {
        console.log(error.response)

        switch(error.response.status) {
            case 400:
                switch(error.response.data) {
                    case "Username already exists":
                        document.getElementById('usernameAlreadyExists').style.display = "block"
                        break
                    case "Invalid username":
                        document.getElementById('invalidUsername').style.display = "block"
                        break
                    case "Email already exists":
                        document.getElementById('emailAlreadyExists').style.display = "block"
                        break
                    case "Invalid email":
                        document.getElementById('invalidEmail').style.display = "block"
                        break
                    case "Invalid password":
                        document.getElementById('invalidPassword').style.display = "block"
                        break
                }
                break
            default:
                document.getElementById('internalError').style.display = "block"
        }
    }
}

function init() {
    hideErrors()
    document.getElementById('success').style.display = "none"
    document.getElementById('signupButton').onclick=()=>{ signup() }
}

function hideErrors() {
    document.getElementById('internalError').style.display = "none"
    document.getElementById('invalidUsername').style.display = "none"
    document.getElementById('usernameAlreadyExists').style.display = "none"
    document.getElementById('invalidEmail').style.display = "none"
    document.getElementById('emailAlreadyExists').style.display = "none"
    document.getElementById('invalidPassword').style.display = "none"
}

window.onload = init