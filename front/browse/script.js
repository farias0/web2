const tokenStorageKey = "token"

function displayContent(contents) {
    const frame = document.getElementById("content")
    const separator = "<br>_____________________________________________________________<br>"

    for (content of contents) {
        frame.innerHTML += "<br><div>" + content.content + "</div>"

        frame.innerHTML += separator
    }
}

async function searchPosts() {
    document.getElementById('publishField').value = ''
    const query = document.getElementById('searchBar').value
    const response = await backend.searchPosts(query)
    displayContent(response)
}

async function publish() {
    document.getElementById('searchBar').value = ''
    var awaitCreate = backend.createPost(
        window.localStorage.getItem(tokenStorageKey),
        document.getElementById('publishField').value)
    document.getElementById('publishing').style.display = "block"
    await awaitCreate
    window.location='./index.html'
}

function tokenValidation() {
    const token = window.localStorage.getItem(tokenStorageKey)
}

function init() {
    tokenValidation()
    hideErrors()
    document.getElementById('searchBar').value = ''
    document.getElementById('publishField').value = ''
    document.getElementById('success').style.display = "none"
    document.getElementById('publishing').style.display = "none"
    document.getElementById('searchButton').onclick=()=>{ searchPosts() }
    document.getElementById('publishButton').onclick=()=>{ publish() }
}

function hideErrors() {
    document.getElementById('userNotFound').style.display = "none"
    document.getElementById('wrongPassword').style.display = "none"
    document.getElementById('internalError').style.display = "none"
}

window.onload = init