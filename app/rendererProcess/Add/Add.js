import { Title } from "../Models/Title.js";
import { Album } from "../Models/Album.js";
import { Artist } from "../Models/Artist.js";
import { Band } from "../Models/Band.js";
import { Genre } from "../Models/Genre.js";

console.log('Loaded');

// Listener function to add new title
window.electronAPI.onNewTitle(async (_event, value) =>
{
    let genres = await Genre.getGenres();
    console.log(genres);

    // Remove any container divs
    let containerDivs = document.getElementsByClassName("container");
    for (let div of containerDivs) {
        div.remove();
    }

    let containerDiv = document.createElement("div");
    containerDiv.className = "container";
    document.getElementById("player").append(containerDiv);

    let headerDiv = document.createElement("div");
    headerDiv.className = "header";
    let h2 = document.createElement("h2");
    h2.innerHTML = "Nouveau Titre";
    headerDiv.append(h2);
    // close button
    let closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "X";
    closeButton.addEventListener("click", (event) =>
    {
        event.preventDefault();
        containerDiv.remove();
    });

    containerDiv.append(headerDiv);
    headerDiv.append(closeButton);

    // Form to add title, artists, genre, album, file
    let form = document.createElement("form");
    form.className = "form";
    containerDiv.append(form);

    // Title
    let fcDiv = document.createElement("div");
    fcDiv.className = "form-control";
    let label = document.createElement("label");
    label.innerHTML = "Titre";
    let input = document.createElement("input");
    input.type = "text";
    input.name = "title";
    input.placeholder = "Titre";

    fcDiv.append(input);
    fcDiv.append(label);


    form.append(fcDiv);

    // Artists
    fcDiv = document.createElement("div");
    fcDiv.className = "form-control";
    label = document.createElement("label");
    label.innerHTML = "Artiste";
    input = document.createElement("input");
    input.type = "text";
    input.name = "artist";
    input.placeholder = "Artiste";

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Genre
    // select input for genre
    fcDiv = document.createElement("div");
    fcDiv.className = "form-control";
    label = document.createElement("label");
    label.innerHTML = "Genre";
    input = document.createElement("select");
    input.name = "genre";
    input.id = "genre";
    input.className = "select";
    // add options to select
    for (let genre of genres) {
        let option = document.createElement("option");
        option.value = genre.name;
        option.innerHTML = genre.name;
        input.append(option);
    }
    let option = document.createElement("option");
    option.value = "Genre";
    option.innerHTML = "Genre";
    option.selected = true;
    input.append(option);

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Album
    fcDiv = document.createElement("div");
    fcDiv.className = "form-control";
    label = document.createElement("label");
    label.innerHTML = "Album";
    input = document.createElement("input");
    input.type = "text";
    input.name = "album";
    input.placeholder = "Album";

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // File
    fcDiv = document.createElement("div");
    fcDiv.className = "form-control";

    label = document.createElement("label");
    label.innerHTML = "Fichier";
    input = document.createElement("input");
    input.type = "text";
    input.name = "file";
    input.placeholder = "Fichier";

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Submit form button
    let submitButton = document.createElement("button");
    submitButton.className = "submit-button";
    submitButton.innerHTML = "Ajouter";
    submitButton.type = "submit";
    // create new title on click
    submitButton.addEventListener("click", (event) =>
    {
        event.preventDefault();
        nouveauTitre(form);
    });


    form.append(submitButton);

});

// Send new title to database
function nouveauTitre(form)
{
    console.log(form);
    let title = form.title.value;
    let artist = form.artist.value;
    let genre = form.genre.value;
    let album = form.album.value;
    let file = form.file.value;
    console.log(title, artist, genre, album, file);

    // create new Title object
    let newTitle = new Title();
    newTitle.name = title;
    newTitle.genre_id = genre;
    // faire liaisons autre tables si besoin
    newTitle.album_id = album;
    newTitle.file_id = file;

    console.log(newTitle.table);

    newTitle.createTitle(artist);

}

// Listener function to add new album
window.electronAPI.onNewAlbum((_event, value) =>
{
    // Remove any container divs
    let containerDivs = document.getElementsByClassName("container");
    for (let div of containerDivs) {
        div.remove();
    }

    let containerDiv = document.createElement("div");
    containerDiv.className = "container";
    document.getElementById("player").append(containerDiv);

    let headerDiv = document.createElement("div");
    headerDiv.className = "header";
    let h2 = document.createElement("h2");
    h2.innerHTML = "Nouvel Album";
    headerDiv.append(h2);
    // close button
    let closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "X";
    closeButton.addEventListener("click", (event) =>
    {
        event.preventDefault();
        containerDiv.remove();
    });

    containerDiv.append(headerDiv);
    headerDiv.append(closeButton);

    // Form to add name, release date 
    let form = document.createElement("form");
    form.className = "form";
    containerDiv.append(form);

    // Name
    let fcDiv = document.createElement("div");
    fcDiv.className = "form-control";
    let label = document.createElement("label");
    label.innerHTML = "Nom";
    let input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    input.placeholder = "Nom";

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Artist
    fcDiv = document.createElement("div");
    fcDiv.className = "form-control";
    label = document.createElement("label");
    label.innerHTML = "Artiste";
    input = document.createElement("input");
    input.type = "text";
    input.name = "artist";
    input.placeholder = "Artiste";

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Release date
    fcDiv = document.createElement("div");
    fcDiv.className = "form-control";
    label = document.createElement("label");
    label.innerHTML = "Date de sortie";
    input = document.createElement("input");
    input.type = "date";
    input.name = "releaseDate";
    input.placeholder = "Date de sortie";

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Submit form button
    let submitButton = document.createElement("button");
    submitButton.className = "submit-button";
    submitButton.innerHTML = "Ajouter";
    submitButton.type = "submit";
    // create new album on click
    submitButton.addEventListener("click", (event) =>
    {
        event.preventDefault();
        nouvelAlbum(form);
    });

    form.append(submitButton);

});


function nouvelAlbum(form)
{
    console.log(form);
    let name = form.name.value;
    let releaseDate = form.releaseDate.value;
    let artist = form.artist.value;
    console.log(name, releaseDate);

    // create new Album object
    let newAlbum = new Album();
    newAlbum.name = name;
    newAlbum.artist_id = artist;
    newAlbum.release_date = releaseDate;

    newAlbum.createAlbum();

}

// Listener function to add new artist
window.electronAPI.onNewArtist((_event, value) =>
{
    // Remove any container divs
    let containerDivs = document.getElementsByClassName("container");
    for (let div of containerDivs) {
        div.remove();
    }

    let containerDiv = document.createElement("div");
    containerDiv.className = "container";
    document.getElementById("player").append(containerDiv);

    let headerDiv = document.createElement("div");
    headerDiv.className = "header";
    let h2 = document.createElement("h2");
    h2.innerHTML = "Nouvel Artiste";
    headerDiv.append(h2);
    // close button
    let closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "X";
    closeButton.addEventListener("click", (event) =>
    {
        event.preventDefault();
        containerDiv.remove();
    });

    containerDiv.append(headerDiv);
    headerDiv.append(closeButton);

    // Form to add name, release date
    let form = document.createElement("form");
    form.className = "form";
    containerDiv.append(form);

    // Firstname
    let fcDiv = document.createElement("div");
    fcDiv.className = "form-control";
    let label = document.createElement("label");
    label.innerHTML = "Prénom";
    let input = document.createElement("input");
    input.type = "text";
    input.name = "firstname";
    input.placeholder = "Prénom";

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Lastname
    fcDiv = document.createElement("div");
    fcDiv.className = "form-control";
    label = document.createElement("label");
    label.innerHTML = "Nom";
    input = document.createElement("input");
    input.type = "text";
    input.name = "lastname";
    input.placeholder = "Nom";

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Stage name
    fcDiv = document.createElement("div");
    fcDiv.className = "form-control";
    label = document.createElement("label");
    label.innerHTML = "Nom de scène";
    input = document.createElement("input");
    input.type = "text";
    input.name = "stageName";
    input.placeholder = "Nom de scène";

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Band name
    fcDiv = document.createElement("div");
    fcDiv.className = "form-control";
    label = document.createElement("label");
    label.innerHTML = "Nom de groupe";
    input = document.createElement("input");
    input.type = "text";
    input.name = "bandName";
    input.placeholder = "Nom de groupe";

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Submit form button
    let submitButton = document.createElement("button");
    submitButton.className = "submit-button";
    submitButton.innerHTML = "Ajouter";
    submitButton.type = "submit";
    // create new artist on click
    submitButton.addEventListener("click", (event) =>
    {
        event.preventDefault();
        nouvelArtist(form);
    });

    form.append(submitButton);

});

// Send new artist to database
function nouvelArtist(form)
{
    console.log(form);
    let firstname = form.firstname.value;
    let lastname = form.lastname.value;
    let stageName = form.stageName.value;
    let bandName = form.bandName.value;
    console.log(firstname, lastname, stageName, bandName);

    // create new Artist object
    let newArtist = new Artist();
    newArtist.firstname = firstname;
    newArtist.lastname = lastname;
    newArtist.stagename = stageName;
    newArtist.band_id = bandName;

    newArtist.createArtist();
}

window.electronAPI.onNewBand((_event, value) =>
{
    // Remove any container divs
    let containerDivs = document.getElementsByClassName("container");
    for (let div of containerDivs) {
        div.remove();
    }

    let containerDiv = document.createElement("div");
    containerDiv.className = "container";
    document.getElementById("player").append(containerDiv);

    let headerDiv = document.createElement("div");
    headerDiv.className = "header";
    let h2 = document.createElement("h2");
    h2.innerHTML = "Nouveau Groupe";
    headerDiv.append(h2);

    // close button
    let closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "X";
    closeButton.addEventListener("click", (event) =>
    {
        event.preventDefault();
        containerDiv.remove();
    });

    containerDiv.append(headerDiv);
    headerDiv.append(closeButton);


    // Form to add name
    let form = document.createElement("form");
    form.className = "form";
    containerDiv.append(form);

    // Name
    let fcDiv = document.createElement("div");
    fcDiv.className = "form-control";
    let label = document.createElement("label");
    label.innerHTML = "Nom";
    let input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    input.placeholder = "Nom";

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Submit form button
    let submitButton = document.createElement("button");
    submitButton.className = "submit-button";
    submitButton.innerHTML = "Ajouter";
    submitButton.type = "submit";
    // create new band on click
    submitButton.addEventListener("click", (event) =>
    {
        event.preventDefault();
        newBand(form);
    }
    );

    form.append(submitButton);
});

function newBand(form)
{
    console.log(form);
    let name = form.name.value;
    console.log(name);

    // create new Band object
    let newBand = new Band();
    newBand.name = name;

    newBand.createBand();

}