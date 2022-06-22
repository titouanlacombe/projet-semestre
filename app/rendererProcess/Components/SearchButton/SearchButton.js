import { SearchSong } from "../../Search/SearchSong.js";
import { Album } from "../../Models/Album.js";
import { Artist } from "../../Models/Artist.js";
import { Title } from "../../Models/Title.js";
import { openAlbum, openArtist } from "../../Components/Viewer/Viewer.js";

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


function displayResults(results)
{
    console.log(results.length);

    // Remove all divs with "container" class
    const containerDivs = document.querySelectorAll('.container');

    containerDivs.forEach(div =>
    {
        div.remove();
    });

    let resultsDiv = document.createElement('div');
    resultsDiv.id = "results";
    resultsDiv.className = "container";
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
            let titleHead = document.createElement('h2');
            titleHead.innerHTML = "Titres";
            title.appendChild(titleHead);
            resultsDiv.appendChild(title);
        }

        titleDivs.forEach(element =>
        {
            console.log(element);
            // element[0].onclick = () =>
            // {
            //     openTitle(element[1]);
            // }
            resultsDiv.appendChild(element[0]);
        });

        if (albumDivs.length > 0) {
            let album = document.createElement('div')
            album.className = "header";
            let albumHead = document.createElement('h2');
            albumHead.innerHTML = "Albums";
            album.appendChild(albumHead);
            resultsDiv.appendChild(album);
        }
        albumDivs.forEach(element =>
        {
            element[0].onclick = () =>
            {
                console.log(element[1]);
                openAlbum(element[1]);
            }
            resultsDiv.appendChild(element[0]);
        });

        if (artistDivs.length > 0) {
            let artist = document.createElement('div')
            artist.className = "header";
            let artistHead = document.createElement('h2');
            artistHead.innerHTML = "Artistes";
            artist.appendChild(artistHead);
            resultsDiv.appendChild(artist);
        }
        artistDivs.forEach(element =>
        {
            element[0].onclick = () =>
            {
                openArtist(element[1]);
            }
            resultsDiv.appendChild(element[0]);
        });


    }

    else {
        let noResults = document.createElement('div');
        noResults.className = "header";
        let noResHeader = document.createElement('h2');
        noResHeader.innerHTML = "Aucun résultat";
        noResults.appendChild(noResHeader);

        // add close button
        let closeButton = document.createElement('button');
        closeButton.className = "close-button";
        closeButton.innerHTML = "&times;";
        closeButton.onclick = () =>
        {
            resultsDiv.remove();
        }
        noResults.appendChild(closeButton);
        resultsDiv.appendChild(noResults);
    }



}

window.addEventListener('DOMContentLoaded', () =>
{
    document.getElementById("searchButton").onclick = launchSearch;
    document.getElementById("searchBar").onkeydown = launchSearch;
});
