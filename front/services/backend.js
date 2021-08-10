const url = 'http://localhost:3000'

const backend = {}

backend.login = async (username, password) => {
    const params = new URLSearchParams(
        "username=" + username + "&password=" + password)
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    var response = await axios.post(url + '/login', params, config)
    return response.data
}