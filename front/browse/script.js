const tokenStorageKey = "token"
const queryStorageKey = "q"

function displayContent(contents) {
    const frame = document.getElementById("content")
    const separator = "<br>_____________________________________________________________<br>"

    for (content of contents) {
        frame.innerHTML += "<br><div>" + content.content + "</div>"

        frame.innerHTML += separator
    }
}

async function loadAllPosts() {
    contents = await backend.getAllPosts()
    displayContent(contents)
}

async function triggerSearch() {
    const query = document.getElementById('searchBar').value
    window.localStorage.setItem(queryStorageKey, query)
    window.location='./index.html'
}

async function searchPosts(query) {
    window.localStorage.removeItem(queryStorageKey)
    contents = await backend.searchPosts(query)
    displayContent(contents)
}

async function publish() {
    document.getElementById('searchBar').value = ''
    var awaitCreate = backend.createPost(
        window.localStorage.getItem(tokenStorageKey),
        document.getElementById('publishField').value,
        "text")
    document.getElementById('publishing').style.display = "block"
    await awaitCreate
    window.location='./index.html'
}

function tokenValidation() {
    const token = window.localStorage.getItem(tokenStorageKey)
    if (!token) window.location='../index.html'
}

function logout() {
    window.localStorage.removeItem(tokenStorageKey)
    window.location='../index.html'
}

function init() {
    tokenValidation()
    document.getElementById('searchBar').value = ''
    document.getElementById('publishField').value = ''
    document.getElementById('success').style.display = "none"
    document.getElementById('publishing').style.display = "none"
    document.getElementById('searchButton').onclick=()=>{ triggerSearch() }
    document.getElementById('publishButton').onclick=()=>{ publish() }
    document.getElementById('logoutButton').onclick=()=>{ logout() }

    const query = window.localStorage.getItem(queryStorageKey)
    if (query) {
        searchPosts(query)
    } else {
        loadAllPosts()
    }
}

window.onload = init