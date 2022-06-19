import { Genre } from "./Genre.js";
import { Album } from "./Album.js";
import { File } from "./File.js";
import { Model } from "./Model.js";
import { Artist } from "./Artist.js";
import { Database } from "../Database/Database.js";

export class Title extends Model
{
    static table = "titles";

    static async search(name)
    {
        return this.all(`WHERE name LIKE '%${name}%'`);
    }

    async artists()
    {
        return Database.sql(`
			SELECT * FROM artists
			LEFT JOIN worked_on ON artist_id = artists._rowid_
			WHERE title_id = ${this._rowid_};`,
            [], "all"
        );
    }

    async genre()
    {
        return Genre.find(this.genre_id);
    }

    async album()
    {
        return Album.find(this.album_id);
    }

    async file()
    {
        return File.find(this.file_id);
    }


    async create()
    {

        let keys = Object.keys(this);
        for (const key of keys) {
            if (this[key] === '' || this[key] === null || this[key] === undefined) {
                this[key] = 'null';
            }
        }


        console.log("Insert request : ");
        console.log(`
        INSERT INTO titles (name, genre_id, file_id, album_id, released_at)
        VALUES ('${this.name}', ${this.genre_id}, ${this.file_id}, ${this.album_id}, '${new Date(Date.now()).toUTCString()}');`);

        Database.sql(`
			INSERT INTO titles (name, genre_id, file_id, album_id, released_at)
            VALUES ('${this.name}', ${this.genre_id}, ${this.file_id}, ${this.album_id}, '${new Date(Date.now()).toUTCString()}');`
        );
    }


    /**
     * 
     * @param {Title} title 
     * @returns 
     */
    static async createTitle(title, artist_id)
    {
        console.log(title);

        if (!title) {
            return null;
        }

        //TODO close window if error
        let stopError = false;
        let data = false;

        // Get artist_id from db
        if (artist_id) {
            data = true;
            let artist = await Artist.searchid(artist_id);
            console.log(artist);
            if (artist) {
                console.log(artist.rowid);
                artist_id = artist.rowid;
            }
            else {
                artist_id = null;
                alert("Aucun artiste correspondant n'a été trouvé, veuillez le créer au préalable.");
                stopError = true;
            }
        }



        // Get genre_id from db
        console.log(title.genre_id);
        if (title.genre_id) {
            data = true;
            let genre = await Genre.searchid(title.genre_id);
            console.log(genre);

            if (genre) {
                console.log(genre.rowid);
                title.genre_id = genre.rowid;
            }
            else {
                alert("Ce genre n'existe pas, veuillez le créer au préalable.");
                title.genre_id = null;
                stopError = true;
            }

        }



        // Get album_id from db
        if (title.album_id) {
            data = true;
            let album = await Album.searchid(title.album_id, artist_id);
            console.log(album);

            if (album) {
                console.log(album.rowid);
                title.album_id = album.rowid;
            }
            else {
                title.album_id = null;
                alert("Aucun album correspondant n'a été trouvé, veuillez le créer au préalable.");
                stopError = true;
            }


        }

        if (title.file_id) {
            data = true;
            let file = await File.searchid(title.file_id);
            console.log(file);

            if (file) {
                console.log(file.rowid);
                title.file_id = file.rowid;
            }
            else {
                title.file_id = null;
                alert("Aucun fichier à cet emplacement, vous pourrez l'ajouter au titre par la suite.");
            }
        }


        console.log(title);

        console.log('stopError : ' + stopError);
        console.log('data : ' + data);

        if (stopError === false && data === true) {

            return await title.create();
        }
        else if (title.name) {
            alert("Erreur lors de la création du titre.\nVeuillez vérifier les données entrées.");
        }

        return null;

    }
}