import { SearchSong } from "../../Search/SearchSong.js";
import { Album } from "../../Models/Album.js";
import { Artist } from "../../Models/Artist.js";
import { Title } from "../../Models/Title.js";
import { Viewer } from "../../Components/Viewer/Viewer.js";

async function launchSearch()
{
    let input = document.getElementById('searchBar').value;
    let results = null;
    console.log(input);
    if (input.length > 0) {
        console.log(results = await SearchSong.multisearch(input));
    }

    displayResults(results);

}

// TODO: Insert albums images
function displayResults(results)
{
    let resultsDiv = document.getElementById('results');

    let titleDivs = [];
    let albumDivs = [];
    let artistDivs = [];
    results.forEach(result =>
    {
        let element = document.createElement('div');

        if (result instanceof Title) {
            element.className = "title";
            element.innerHTML = result.name;
            titleDivs.push([element, result]);
        }
        else if (result instanceof Album) {
            element.className = "album";
            element.innerHTML = result.name;
            albumDivs.push([element, result]);
        }
        else if (result instanceof Artist) {
            element.className = "artist";
            element.innerHTML = result.stagename;
            artistDivs.push([element, result]);
        }
    });

    console.log(titleDivs);
    console.log(albumDivs);
    console.log(artistDivs);


    if (titleDivs.length > 0) {
        let title = document.createElement('div')
        title.className = "header";
        title.innerHTML = "Titles";
        resultsDiv.appendChild(title);
    }

    titleDivs.forEach(element =>
    {
        console.log(element);
        element[0].onclick = () =>
        {
            Viewer.openTitle(element[1]);
        }
        resultsDiv.appendChild(element[0]);
    });

    if (albumDivs.length > 0) {
        let album = document.createElement('div')
        album.className = "header";
        album.innerHTML = "Albums";
        resultsDiv.appendChild(album);
    }
    albumDivs.forEach(element =>
    {
        element[0].onclick = () =>
        {
            Viewer.openAlbum(element[1]);
        }
        resultsDiv.appendChild(element[0]);
    });

    if (artistDivs.length > 0) {
        let artist = document.createElement('div')
        artist.className = "header";
        artist.innerHTML = "Artists";
        resultsDiv.appendChild(artist);
    }
    artistDivs.forEach(element =>
    {
        element[0].onclick = () =>
        {
            Viewer.openArtist(element[1]);
        }
        resultsDiv.appendChild(element[0]);
    });

    resultsDiv.style.display = "block";
}

window.addEventListener('DOMContentLoaded', () =>
{
    document.getElementById("searchButton").onclick = launchSearch;
});
