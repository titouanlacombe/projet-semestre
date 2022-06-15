
function addTitle()
{

    let titleDiv = document.createElement("div");
    titleDiv.className = "title";
    document.getElementsByTagName("player").append(titleDiv);

    // Form to add title, artists, genre, album, file
    let form = document.createElement("form");
    form.className = "add-title";
    titleDiv.append(form);

    // Title
    let titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Title";
    titleInput.name = "title";
    form.append(titleInput);

    // Artists
    let artistsInput = document.createElement("input");
    artistsInput.type = "text";
    artistsInput.placeholder = "Artists";
    artistsInput.name = "artists";
    form.append(artistsInput);

    // Genre
    let genreInput = document.createElement("input");
    genreInput.type = "text";
    genreInput.placeholder = "Genre";
    genreInput.name = "genre";
    form.append(genreInput);

    // Album
    let albumInput = document.createElement("input");
    albumInput.type = "text";
    albumInput.placeholder = "Album";
    albumInput.name = "album";
    form.append(albumInput);

    // File
    let fileInput = document.createElement("input");
    fileInput.type = "text";
    fileInput.placeholder = "File";
    fileInput.name = "file";
    form.append(fileInput);

}


module.exports = addTitle;