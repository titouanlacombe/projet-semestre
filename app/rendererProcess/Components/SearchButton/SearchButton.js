import { SearchSong } from "../../Search/SearchSong.js";
import { Album } from "../../Models/Album.js";
import { Artist } from "../../Models/Artist.js";
import { Title } from "../../Models/Title.js";
import { Viewer } from "../../Components/Viewer/Viewer.js";

async function launchSearch(event)
{
    let input = document.getElementById('searchBar').value;
    let results = null;
    console.log(event);
    if (event instanceof KeyboardEvent) {
        // if key is enter
        if (event.key === 'Enter' && input.length > 0) {
            results = await SearchSong.multisearch(input);
            displayResults(results);
        }
    }
    else {
        console.log(input);
        if (input.length > 0) {
            console.log(results = await SearchSong.multisearch(input));
            displayResults(results);
        }
    }




}

// TODO: Insert albums images
function displayResults(results)
{
    console.log(results.length);

    let resultsDiv = document.getElementById('results');
    resultsDiv.remove();

    resultsDiv = document.createElement('div');
    resultsDiv.id = "results";
    document.getElementById('player').appendChild(resultsDiv);

    resultsDiv.style.display = "block";

    if (results.length) {

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


    }
    // TODO: Case where no results
    else {
        let noResults = document.createElement('div');
        noResults.className = "noResults";
        noResults.innerHTML = "No results";
        resultsDiv.appendChild(noResults);
    }



}

window.addEventListener('DOMContentLoaded', () =>
{
    document.getElementById("searchButton").onclick = launchSearch;
    document.getElementById("searchBar").onkeydown = launchSearch;
});
