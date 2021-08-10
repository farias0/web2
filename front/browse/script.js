function displayContent(contents) {
    const frame = document.getElementById("content")
    const separator = "<br>_____________________________________________________________<br>"

    for (content of contents) {
        frame.innerHTML += "<br><div>" + content.content + "</div>"

        frame.innerHTML += separator
    }
}

async function searchPosts() {
    const query = document.getElementById('searchBar').value
    const response = await backend.searchPosts(query)
    console.log(response)
    displayContent(response)
}

function tokenValidation() {
    // if not, redirect to index
}

function init() {
    tokenValidation()
    hideErrors()
    document.getElementById('success').style.display = "none"
    document.getElementById('searchButton').onclick=()=>{ searchPosts() }
}

function hideErrors() {
    document.getElementById('userNotFound').style.display = "none"
    document.getElementById('wrongPassword').style.display = "none"
    document.getElementById('internalError').style.display = "none"
}

window.onload = init