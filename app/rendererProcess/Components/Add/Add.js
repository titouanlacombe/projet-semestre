import { Title } from "../../Models/Title.js";
import { Album } from "../../Models/Album.js";
import { Artist } from "../../Models/Artist.js";
import { Band } from "../../Models/Band.js";
import { Genre } from "../../Models/Genre.js";

console.log('Loaded');

export { titleForm, artistForm, albumForm };

async function titleForm(title = null)
{
    console.log(title);
    let genres = await Genre.getGenres();
    console.log(genres);

    // Remove all divs with "container" class
    const containerDivs = document.querySelectorAll('.container');

    containerDivs.forEach(div =>
    {
        div.remove();
    });

    let containerDiv = document.createElement("div");
    containerDiv.className = "container";
    document.getElementById("player").append(containerDiv);

    let headerDiv = document.createElement("div");
    headerDiv.className = "header";
    let h2 = document.createElement("h2");
    if (!title)
        h2.innerHTML = "Nouveau Titre";
    else
        h2.innerHTML = "Modifier Titre";
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
    if (title)
        input.value = title.name;

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

    if (title) {
        let artist = await title.artist();
        input.value = artist.stagename;
    }


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
    let titleGenre = null;
    if (title)
        titleGenre = await title.genre();
    for (let genre of genres) {
        let option = document.createElement("option");
        option.value = genre.name;
        option.innerHTML = genre.name;
        if (titleGenre === genre)
            option.selected = true;
        input.append(option);
    }
    let option = document.createElement("option");
    option.value = "Genre";
    option.innerHTML = "Genre";
    if (!titleGenre)
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
    if (title) {
        let titleAlbum = await title.album();
        input.value = titleAlbum.name;
    }

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
    if (title) {
        let titleFile = await title.file();
        if (titleFile)
            input.value = titleFile.name;
    }

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Submit form button
    let submitButton = document.createElement("button");
    submitButton.className = "submit-button";
    if (!title)
        submitButton.innerHTML = "Ajouter";
    else
        submitButton.innerHTML = "Modifier";
    submitButton.type = "submit";
    // create new title on click
    if (title)
        submitButton.addEventListener("click", async (event) =>
        {
            event.preventDefault();
            modifierTitre(title.rowid, form);
            containerDiv.remove();
        });
    else
        submitButton.addEventListener("click", (event) =>
        {
            event.preventDefault();
            nouveauTitre(form);
            containerDiv.remove();
        });


    form.append(submitButton);
}

// Listener function to add new title
window.electronAPI.onNewTitle(async (_event, value) =>
{
    titleForm();

});

// Send modified title to database
async function modifierTitre(id, form)
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
    newTitle.rowid = id;
    newTitle.name = title;
    newTitle.genre_id = genre;
    // faire liaisons autre tables si besoin
    newTitle.album_id = album;
    newTitle.file_id = file;

    console.log(newTitle.table);

    try {
        await newTitle.update(artist);
        alert("Titre modifié");
    }
    catch (error) {
        console.log(error);
        alert("Erreur lors de la modification du titre");
    }

}

// Send new title to database
async function nouveauTitre(form)
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
    try {
        await newTitle.createTitle(artist);
    } catch (error) {
        alert("Erreur lors de la création du titre");
    }


}

// Listener function to add new album
window.electronAPI.onNewAlbum((_event, value) =>
{
    albumForm();
});

async function modifierAlbum(id, form)
{

    console.log(form);
    let name = form.name.value;
    let artist = form.artist.value;
    let date = form.releaseDate.value;
    console.log(date);

    let album = new Album();
    album.rowid = id;
    album.name = name;
    album.artist_id = artist;
    album.released_at = date;

    try {
        await album.update();
        alert("Album modifié");
    }
    catch (error) {
        console.log(error);
        alert("Erreur lors de la modification de l'album");
    }
}

async function albumForm(album = null)
{
    // Remove all divs with "container" class
    const containerDivs = document.querySelectorAll('.container');

    containerDivs.forEach(div =>
    {
        div.remove();
    });

    let containerDiv = document.createElement("div");
    containerDiv.className = "container";
    document.getElementById("player").append(containerDiv);

    let headerDiv = document.createElement("div");
    headerDiv.className = "header";
    let h2 = document.createElement("h2");
    if (album)
        h2.innerHTML = "Modifier album";
    else
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
    if (album)
        input.value = album.name;

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
    if (album) {
        let artist = await album.artist();
        input.value = artist.stagename;
    }

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Release date
    fcDiv = document.createElement("div");
    fcDiv.className = "form-control";
    label = document.createElement("label");
    label.innerHTML = "Date de sortie";
    input = document.createElement("input");
    input.type = "text";
    input.name = "releaseDate";
    input.placeholder = "Date de sortie";
    if (album)
        input.value = album.released_at;

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Submit form button
    let submitButton = document.createElement("button");
    submitButton.className = "submit-button";
    if (!album)
        submitButton.innerHTML = "Ajouter";
    else
        submitButton.innerHTML = "Modifier";
    submitButton.type = "submit";
    // create new album on click
    if (album)
        submitButton.addEventListener("click", async (event) =>
        {
            event.preventDefault();
            modifierAlbum(album.rowid, form);
            containerDiv.remove();
        });
    else
        submitButton.addEventListener("click", (event) =>
        {
            event.preventDefault();
            nouvelAlbum(form);
            containerDiv.remove();
        });

    form.append(submitButton);
}


async function nouvelAlbum(form)
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

    try {
        await newAlbum.createAlbum();
    } catch (error) {
        alert("Erreur lors de la création de l'album");
    }


}

async function artistForm(artist = null)
{
    console.log(artist);
    // Remove all divs with "container" class
    const containerDivs = document.querySelectorAll('.container');

    containerDivs.forEach(div =>
    {
        div.remove();
    });

    let containerDiv = document.createElement("div");
    containerDiv.className = "container";
    document.getElementById("player").append(containerDiv);

    let headerDiv = document.createElement("div");
    headerDiv.className = "header";
    let h2 = document.createElement("h2");
    if (artist)
        h2.innerHTML = "Modifier artiste";
    else
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
    if (artist && artist.firstname)
        input.value = artist.firstname;

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
    if (artist && artist.lastname)
        input.value = artist.lastname;


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
    if (artist && artist.stagename)
        input.value = artist.stagename;

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
    if (artist) {
        let bandName = await artist.band();
        if (bandName)
            input.value = bandName.name;
    }

    fcDiv.append(input);
    fcDiv.append(label);

    form.append(fcDiv);

    // Submit form button
    let submitButton = document.createElement("button");
    submitButton.className = "submit-button";
    if (!artist)
        submitButton.innerHTML = "Ajouter";
    else
        submitButton.innerHTML = "Modifier";
    submitButton.type = "submit";
    // create new artist on click
    if (artist)
        submitButton.addEventListener("click", (event) =>
        {
            event.preventDefault();
            updateArtist(artist.rowid, form);
            containerDiv.remove();
        });
    else
        submitButton.addEventListener("click", (event) =>
        {
            event.preventDefault();
            nouvelArtist(form);
            containerDiv.remove();
        });

    form.append(submitButton);
}

// Listener function to add new artist
window.electronAPI.onNewArtist((_event, value) =>
{
    artistForm();
});

// Send modified artist to database
async function updateArtist(id, form)
{
    let firstname = form.firstname.value;
    let lastname = form.lastname.value;
    let stageName = form.stageName.value;
    let bandName = form.bandName.value;

    let artist = new Artist();
    artist.rowid = id;
    artist.firstname = firstname;
    artist.lastname = lastname;
    artist.stagename = stageName;
    artist.band_id = bandName;

    try {
        await artist.update();
        alert("Artiste modifié");
    }
    catch (error) {
        console.log(error);
        alert("Erreur lors de la modification de l'artiste");
    }
}

// Send new artist to database
async function nouvelArtist(form)
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
    try {
        newArtist.createArtist();
    } catch (error) {
        console.log(error);
        alert("Erreur lors de la création de l'artiste");
    }

}

window.electronAPI.onNewBand((_event, value) =>
{
    // Remove all divs with "container" class
    const containerDivs = document.querySelectorAll('.container');

    containerDivs.forEach(div =>
    {
        div.remove();
    });

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