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

    static async getTitles()
    {
        return Title.all();
    }

    async artists()
    {
        return this.all(`
			LEFT JOIN worked_on ON artist_id = artists._rowid_
			WHERE title_id = ${this._rowid_};`
        );
    }

    async artist()
    {
        let object = await Database.sql(`
            SELECT * FROM artists
            LEFT JOIN albums ON artist_id = artists._rowid_
            WHERE albums.rowid = ${this.album_id};`,
            [], "get"
        );
        return Artist.generateModel(object);
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

    async removeTitle()
    {
        return Database.sql(`
            DELETE FROM titles WHERE rowid = ${this.rowid}`
        );
    }

    async updateGenre(genre_id)
    {
        return Database.sql(`
            UPDATE titles
            SET genre_id = (SELECT rowid FROM genres WHERE name = '${genre_id}')
            WHERE _rowid_ = ${this.rowid}
        `);
    }

    async removeFromAlbum()
    {
        return Database.sql(`
            UPDATE titles
            SET album_id = NULL
            WHERE _rowid_ = ${this.rowid}
        `);
    }

    async update(artist_id)
    {
        let artistId = await Artist.searchid(artist_id);

        return Database.sql(`
            UPDATE titles
            SET album_id = (SELECT rowid FROM albums WHERE artist_id = '${artistId.rowid}'),
            name = '${this.name}',
            genre_id = (SELECT rowid FROM genres WHERE name is '${this.genre_id}'),
            file_id = (SELECT rowid FROM files WHERE path is '${this.file_id}')
            WHERE _rowid_ = ${this.rowid}
        `);
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
    async createTitle(artist_id)
    {
        console.log(this);

        if (!this) {
            return null;
        }

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
        console.log(this.genre_id);
        if (this.genre_id && this.genre_id !== 'Genre') {
            data = true;
            let genre = await Genre.searchid(this.genre_id);
            console.log(genre);

            if (genre) {
                console.log(genre.rowid);
                this.genre_id = genre.rowid;
            }
            else {
                alert("Ce genre n'existe pas, veuillez le créer au préalable.");
                this.genre_id = null;
                stopError = true;
            }

        }



        // Get album_id from db
        if (this.album_id) {
            data = true;
            let album = await Album.searchid(this.album_id, artist_id);
            console.log(album);

            if (album) {
                console.log(album.rowid);
                this.album_id = album.rowid;
            }
            else {
                this.album_id = null;
                alert("Aucun album correspondant n'a été trouvé, veuillez le créer au préalable.");
                stopError = true;
            }


        }

        if (this.file_id) {
            data = true;
            let file = await File.searchid(this.file_id);
            console.log(file);

            if (file) {
                console.log(file.rowid);
                this.file_id = file.rowid;
            }
            else {
                this.file_id = null;
                alert("Aucun fichier à cet emplacement, vous pourrez l'ajouter au titre par la suite.");
            }
        }


        console.log(this);

        console.log('stopError : ' + stopError);
        console.log('data : ' + data);

        if (stopError === false && data === true) {

            try {
                await this.create();
                alert("Titre créé avec succès !");
            }
            catch (error) {
                alert("Erreur lors de la création du titre.");
            }

        }
        else if (this.name) {
            alert("Erreur lors de la création du titre.\nVeuillez vérifier les données entrées.");
        }

        return null;

    }
}