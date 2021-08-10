const tokenStorageKey = "token"
const queryStorageKey = "q"

function displayContent(contents) {
    const frame = document.getElementById("content")
    const separator = "<br>_____________________________________________________________<br>"

    for (content of contents) {
        frame.innerHTML += "<br><div>" 
        switch (content.contentType) {
            case 'text':
                frame.innerHTML += content.content
                break
            case 'image':
                // frame.innerHTML += "<img src=\"data:image\/png;base64, \"" + content.content + "\/>"
                break
            case 'video':
                break
        }
        frame.innerHTML += "</div>" + separator
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
    if (document.getElementById('publishField').value) await publishText()
    // if (document.getElementById('publishFileButton').files[0]) await publishFile()
    window.location='./index.html'
}

async function publishFile() {
    document.getElementById('invalidFileType').style.display = "none"
    const file = document.getElementById('publishFileButton').files[0]
    
    let contentType = ''
    if (file.type.includes('image')) contentType = 'image'
    else if (file.type.includes('video')) contentType = 'video'
    else {
        document.getElementById('invalidFileType').style.display = "block"
        return
    }
    document.getElementById('publishing').style.display = "block"

    const reader = new FileReader()
    reader.onload = async (event) => {
        console.log(event.target.result)
        await backend.createPost(
            window.localStorage.getItem(tokenStorageKey),
            event.target.result,
            contentType
        )
    }
    reader.readAsText(file)
}

async function publishText() {
    document.getElementById('publishing').style.display = "block"
    await backend.createPost(
        window.localStorage.getItem(tokenStorageKey),
        document.getElementById('publishField').value,
        "text"
    )
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
    document.getElementById('invalidFileType').style.display = "none"
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