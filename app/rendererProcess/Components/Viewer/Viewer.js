export class Viewer
{
    static openAlbum(album)
    {
        console.log(album);
        let resultDivs = document.getElementById("results");
        resultDivs.style.display = "none";

        let albumDiv = document.createElement('div');
        albumDiv.className = "Album";
        document.getElementById("player").appendChild(albumDiv);

    }

    static openTitle(title)
    {
        console.log(title);
    }

    static openArtist(artist)
    {
        console.log(artist);
    }
}

