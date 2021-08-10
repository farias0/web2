const url = 'http://localhost:3000'

const backend = {}

async function genericPost(path, query) {
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
    return await genericPost('/login', 
        "username=" + username + "&password=" + password)
}

backend.signup = async (username, email, password) => {
    return await genericPost('/user', 
        "username=" + username + "&email=" + email + "&password=" + password)
}

backend.searchPosts = async (query) => {
    const response = await axios.get(url + "/post", { q: query })
    return response.data
}

backend.createPost = async (token, content) => {
    return await genericPost('/post', 
        "token=" + token + "&content=" + content)
}