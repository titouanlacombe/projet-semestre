import { Album } from "../Models/Album.js";
import { Artist } from "../Models/Artist.js";
import { Title } from "../Models/Title.js";

// TODO Rename to search title
export class SearchSong
{
    // Search with title name & artists name(s) & band names
    static async multisearch(input)
    {
        // TODO 
        let result = [];
        let resultsAlbum = await Album.search(input);
        // console.log("Albums " + resultsAlbum);
        result = result.concat(resultsAlbum);
        // console.log(result);
        let resultsTitle = await Title.search(input);
        // console.log("Titles: " + resultsTitle);
        result = result.concat(resultsTitle);
        let resultsArtist = await Artist.search(input);
        // console.log("Artists " + resultsArtist);
        result = result.concat(resultsArtist);
        return result;
    }
}
