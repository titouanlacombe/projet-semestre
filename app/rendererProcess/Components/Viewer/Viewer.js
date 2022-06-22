import { Album } from "../../Models/Album.js";
import { Artist } from "../../Models/Artist.js";
import { Genre } from "../../Models/Genre.js";
import { Title } from "../../Models/Title.js";
import { Band } from "../../Models/Band.js";
import { titleForm, artistForm, albumForm } from "../Add/Add.js";


export { openAlbum, openArtist };

async function openAlbum(album)
{
    // Remove all divs with "container" class
    const containerDivs = document.querySelectorAll('.container');

    containerDivs.forEach(div =>
    {
        div.remove();
    });

    let props = await Album.searchBis(album.name, album.artist_id);
    console.log(props);

    let container = document.createElement("div");
    container.id = "album";
    container.className = "container";

    let flex = document.createElement("div");
    flex.className = "flex2";

    let albumDiv = document.createElement("div");
    albumDiv.className = "album";

    let albumName = document.createElement("h2");
    albumName.innerHTML = album.name;
    albumDiv.appendChild(albumName);

    let artist = await Artist.searchBis(album.artist_id);

    let band = await artist.band();

    let bandName = document.createElement("h3");
    if (band)
        bandName.innerHTML = band.name;
    else
        bandName.innerHTML = artist.stagename;
    albumDiv.appendChild(bandName);

    if (album.released_at != null) {
        let date = document.createElement("p");
        date.innerHTML = album.released_at;
        albumDiv.appendChild(date);
    }

    let titles = await props.titles();

    let genre_id = null;
    let noGenre = true;
    if (titles.length > 0) {
        for (const title of titles) {
            console.log(title);
            if (title.genre_id != null) {
                genre_id = title.genre_id;
                noGenre = false;
                break;
            }
        }
    } else {
        alert("Cet album ne contient aucun titre.");
        return;
    }

    if (!noGenre) {

        let genre = await Genre.searchBis(genre_id);
        console.log(genre);
        let genreDiv = document.createElement("h4");
        genreDiv.innerHTML = genre.name;
        albumDiv.appendChild(genreDiv);
    }

    flex.appendChild(albumDiv);

    let albumArt = document.createElement("div");
    albumArt.className = "albumArt";

    let albumArtImg = document.createElement("img");
    albumArtImg.src = "../resources/icon.png";
    albumArt.appendChild(albumArtImg);

    flex.appendChild(albumArt);

    container.appendChild(flex);

    let albums = document.createElement("div");
    albums.id = "songs";
    container.appendChild(albums);

    // TODO: end div
    // let albumList = document.createElement("ul");
    for (let song of titles) {
        console.log(song);
        let songDiv = document.createElement("div");
        songDiv.className = "song";
        // new div around select and label
        let selectDiv = document.createElement("div");
        // selectDiv.className = "form-control";

        // end div
        let endDiv = document.createElement("div");
        endDiv.className = "end";

        // new select input for song genre
        let genreSelect = document.createElement("select");
        endDiv.append(genreSelect);
        genreSelect.id = "genre";
        genreSelect.className = "select";
        genreSelect.name = "genre";
        genreSelect.onchange = function ()
        {
            song.updateGenre(genreSelect.value);
        }
        let genreOptions = await Genre.getGenres();
        let songGenre = await song.genre();
        for (let genre of genreOptions) {
            let option = document.createElement("option");
            option.value = genre.name;
            option.innerHTML = genre.name;
            if (songGenre && songGenre.name == genre.name)
                option.selected = true;
            genreSelect.append(option);
        }

        // remove button
        let removeButton = document.createElement("button");
        removeButton.className = "close-button"
        removeButton.innerHTML = "x";
        removeButton.onclick = function ()
        {
            song.removeFromAlbum();
            songDiv.remove();
        }

        songDiv.innerHTML = song.name;
        // selectDiv.append(label);
        selectDiv.append(genreSelect);
        endDiv.appendChild(selectDiv);
        endDiv.appendChild(removeButton);
        songDiv.appendChild(endDiv);
        albums.appendChild(songDiv);
    }
    // albums.appendChild(albumList);

    document.getElementById("player").appendChild(container);

    return container;
}


async function openArtist(artist)
{
    console.log(artist);
    // Remove all divs with "container" class
    const containerDivs = document.querySelectorAll('.container');

    containerDivs.forEach(div =>
    {
        div.remove();
    });


    // let props = await Artist.searchBis(artist.name);
    // console.log(props);

    let container = document.createElement("div");
    container.id = "artist";
    container.className = "container";

    let flex = document.createElement("div");
    flex.className = "flex2";

    let artistDiv = document.createElement("div");
    artistDiv.className = "artist";

    let artistName = document.createElement("h2");
    artistName.innerHTML = artist.stagename;
    artistDiv.appendChild(artistName);

    let band = await artist.band();


    if (band) {
        let bandName = document.createElement("h3");
        bandName.innerHTML = band.name;
        artistDiv.appendChild(bandName);
    }

    console.log(artist);
    let titles = await artist.titles();
    console.log("test");

    flex.appendChild(artistDiv);

    let artistArt = document.createElement("div");
    artistArt.className = "artistArt";

    let artistArtImg = document.createElement("img");
    artistArtImg.src = "../resources/icon.png";
    artistArt.appendChild(artistArtImg);

    flex.appendChild(artistArt);

    container.appendChild(flex);

    let songs = document.createElement("div");
    songs.id = "songs";
    container.appendChild(songs);

    for (const song of titles) {
        console.log();
        let songDiv = document.createElement("div");
        songDiv.className = "song";
        // new div around select and label
        let selectDiv = document.createElement("div");
        // selectDiv.className = "form-control";

        // end div
        let endDiv = document.createElement("div");
        endDiv.className = "end";

        // new select input for song genre
        let genreSelect = document.createElement("select");
        endDiv.append(genreSelect);
        genreSelect.id = "genre";
        genreSelect.className = "select";
        genreSelect.name = "genre";
        genreSelect.onchange = function ()
        {
            song.updateGenre(genreSelect.value);
        }

        let genreOptions = await Genre.getGenres();

        let songGenre = await song.genre();
        for (let genre of genreOptions) {
            let option = document.createElement("option");
            option.value = genre.name;
            option.innerHTML = genre.name;
            if (songGenre && songGenre.name == genre.name)
                option.selected = true;
            genreSelect.append(option);
        }

        // remove button
        let removeButton = document.createElement("button");
        removeButton.className = "close-button"
        removeButton.innerHTML = "x";
        removeButton.onclick = function ()
        {
            song.removeFromAlbum();
            songDiv.remove();
        }

        songDiv.innerHTML = song.name;
        // selectDiv.append(label);
        selectDiv.append(genreSelect);
        endDiv.appendChild(selectDiv);
        endDiv.appendChild(removeButton);
        songDiv.appendChild(endDiv);
        songs.appendChild(songDiv);
    }
    // albums.appendChild(albumList);

    document.getElementById("player").appendChild(container);

    return container;
}

// Listener function to display albums
window.electronAPI.onDisplayAlbums(async (_event, value) =>
{
    console.log("Open Albums");
    // Remove all divs with "container" class
    const containerDivs = document.querySelectorAll('.container');

    containerDivs.forEach(div =>
    {
        div.remove();
    });

    console.log("Display albums");
    let albums = await Album.getAlbums();

    let container = document.createElement("div");
    container.id = "album";
    container.className = "container";

    let albumsDiv = document.createElement("div");
    albumsDiv.id = "albums";
    albumsDiv.className = "albums";
    container.appendChild(albumsDiv);

    for (let album of albums) {
        console.log(album);

        let albumDiv = document.createElement("div");
        albumDiv.className = "singlealbum";
        let albumName = document.createElement("h2");
        albumName.innerHTML = album.name;
        albumDiv.appendChild(albumName);

        // end div
        let artist = await Artist.searchBis(album.artist_id);
        let endDiv = document.createElement("div");
        endDiv.className = "end";

        let band = await artist.band();

        let bandName = document.createElement("h3");
        if (band != null && band != undefined)
            bandName.innerHTML = band.name;
        else
            bandName.innerHTML = "Solo";
        endDiv.appendChild(bandName);

        // modify button
        let modifyButton = document.createElement("button");
        modifyButton.className = "edit-button"
        modifyButton.innerHTML = "Modifier";
        modifyButton.onclick = function ()
        {
            albumForm(album);
            albumDiv.remove();
        }
        endDiv.appendChild(modifyButton);

        // delete button
        let deleteButton = document.createElement("button");
        deleteButton.className = "close-button"
        deleteButton.innerHTML = "x";
        deleteButton.onclick = function ()
        {
            album.removeAlbum();
            albumDiv.remove();
        }

        endDiv.appendChild(deleteButton);
        albumDiv.appendChild(endDiv);

        albumsDiv.appendChild(albumDiv);

    }




    document.getElementById("player").appendChild(container);
});


// Listener function to display titles
window.electronAPI.onDisplayTitles(async (_event, value) =>
{
    console.log("Open Titles");
    // Remove all divs with "container" class
    const containerDivs = document.querySelectorAll('.container');

    containerDivs.forEach(div =>
    {
        div.remove();
    });

    console.log("Display titles");

    let titles = await Title.getTitles();
    console.log(titles);
    let container = document.createElement("div");
    container.id = "title";
    container.className = "container";

    let titlesDiv = document.createElement("div");
    titlesDiv.id = "titles";
    titlesDiv.className = "titles";
    container.appendChild(titlesDiv);

    for (let title of titles) {
        console.log(title);

        let titleDiv = document.createElement("div");
        titleDiv.className = "singletitle";
        let titleName = document.createElement("h2");
        titleName.innerHTML = title.name;
        titleDiv.appendChild(titleName);
        console.log("Getting artist");
        let artist = await title.artist();
        console.log(artist);

        let endDiv = document.createElement("div");
        endDiv.className = "end";

        let band = await artist.band();
        let bandName = document.createElement("h3");
        if (band != null && band != undefined)
            bandName.innerHTML = band.name;
        else
            bandName.innerHTML = "Solo";
        endDiv.appendChild(bandName);

        // modify button
        let modifyButton = document.createElement("button");
        modifyButton.className = "edit-button"
        modifyButton.innerHTML = "Modifier";
        modifyButton.onclick = function ()
        {
            titleForm(title);
        }
        endDiv.appendChild(modifyButton);

        // delete button
        let deleteButton = document.createElement("button");
        deleteButton.className = "close-button"
        deleteButton.innerHTML = "x";
        deleteButton.onclick = function ()
        {
            title.removeTitle();
            titleDiv.remove();
        }
        endDiv.appendChild(deleteButton);

        titleDiv.appendChild(endDiv);
        titlesDiv.appendChild(titleDiv);

    }

    document.getElementById("player").appendChild(container);

    return container;
});

// Listener function to display artists
window.electronAPI.onDisplayArtists(async (_event, value) =>
{
    console.log("Open Artists");
    // Remove all divs with "container" class
    const containerDivs = document.querySelectorAll('.container');

    containerDivs.forEach(div =>
    {
        div.remove();
    });

    console.log("Display artists");
    let artists = await Artist.getArtists();

    let container = document.createElement("div");
    container.id = "artist";
    container.className = "container";

    let artistsDiv = document.createElement("div");
    artistsDiv.id = "artists";
    artistsDiv.className = "artists";
    container.appendChild(artistsDiv);

    for (let artist of artists) {
        console.log(artist);

        let artistDiv = document.createElement("div");
        artistDiv.className = "singleartist";
        let artistName = document.createElement("h2");
        artistName.innerHTML = artist.stagename;
        artistDiv.appendChild(artistName);

        // end div
        let endDiv = document.createElement("div");
        endDiv.className = "end";

        let band = await artist.band();
        let bandName = document.createElement("h3");
        if (band != null && band != undefined)
            bandName.innerHTML = band.name;
        else
            bandName.innerHTML = "Solo";
        endDiv.appendChild(bandName);

        // modify button
        let modifyButton = document.createElement("button");
        modifyButton.className = "edit-button"
        modifyButton.innerHTML = "Modifier";
        modifyButton.onclick = function ()
        {
            artistForm(artist);
            artistDiv.remove();
        }
        endDiv.appendChild(modifyButton);

        // delete button
        let deleteButton = document.createElement("button");
        deleteButton.className = "close-button"
        deleteButton.innerHTML = "x";
        deleteButton.onclick = async function ()
        {
            let albums = await artist.albums();
            if (!albums.length) {
                artist.removeArtist();
                artistDiv.remove();
            }
            else {
                alert("Vous devez d'abord retirer les albums de cet artiste");
            }

        }
        endDiv.appendChild(deleteButton);

        artistDiv.appendChild(endDiv);
        artistsDiv.appendChild(artistDiv);
    }

    document.getElementById("player").appendChild(container);

    return container;

});

// Listener function display bands
window.electronAPI.onDisplayBands(async (_event, value) =>
{
    console.log("Open Bands");
    // Remove all divs with "container" class
    const containerDivs = document.querySelectorAll('.container');

    containerDivs.forEach(div =>
    {
        div.remove();
    });

    console.log("Display bands");
    let bands = await Band.getBands();

    let container = document.createElement("div");
    container.id = "band";
    container.className = "container";

    let bandsDiv = document.createElement("div");
    bandsDiv.id = "bands";
    bandsDiv.className = "bands";
    container.appendChild(bandsDiv);

    for (let band of bands) {
        console.log(band);

        let bandDiv = document.createElement("div");
        bandDiv.className = "singleband";
        let bandName = document.createElement("h2");
        bandName.innerHTML = band.name;
        bandDiv.appendChild(bandName);

        let artistsDiv = document.createElement("div");
        artistsDiv.className = "artists";
        bandDiv.appendChild(artistsDiv);

        let artists = await band.artists();
        for (let artist of artists) {
            let artistDiv = document.createElement("div");
            artistDiv.className = "singleartist";
            let artistName = document.createElement("h3");
            artistName.innerHTML = artist.stagename;
            artistDiv.appendChild(artistName);
            artistsDiv.appendChild(artistDiv);

            // end div
            let endDiv = document.createElement("div");
            endDiv.className = "end";

            // close button
            let closeButton = document.createElement("button");
            closeButton.className = "close-button"
            closeButton.innerHTML = "x";
            closeButton.onclick = function ()
            {
                band.removeArtist(artist.rowid);
                artistDiv.remove();
            }
            endDiv.appendChild(closeButton);

            artistDiv.appendChild(endDiv);
            bandDiv.appendChild(artistDiv);
        }
        bandsDiv.appendChild(bandDiv);

    }

    document.getElementById("player").appendChild(container);

    return container;
});


