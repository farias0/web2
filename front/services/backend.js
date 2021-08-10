const url = 'http://localhost:3000'

const backend = {}

async function genericRequest(path, query) {
    const params = new URLSearchParams(query)
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    var response = await axios.post(url + path, params, config)
    return response.data
}

backend.login = async (username, password) => {
    return await genericRequest('/login', 
        "username=" + username + "&password=" + password)
}

backend.signup = async (username, email, password) => {
    return await genericRequest('/user', 
        "username=" + username + "&email=" + email + "&password=" + password)
}