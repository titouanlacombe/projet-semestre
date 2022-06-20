import { Database } from "../Database/Database.js";
import { Model } from "./Model.js";
import { Artist } from "./Artist.js";

export class Album extends Model
{
    static table = "albums";

    static async searchid(name, artist_id)
    {

        return Database.sql(`
			SELECT rowid FROM albums WHERE name LIKE '${name}' AND artist_id = ${artist_id};`,
            [], 'get'
        );


    }

    static async search(name)
    {
        return this.all(`WHERE name LIKE '%${name}%'`);
    }

    async titles()
    {
        return Database.sql(`
			SELECT * FROM titles WHERE album_id = ${this.rowid};`,
            [], "all"
        );
    }

    async create()
    {
        return Database.sql(`
            INSERT INTO albums(name, artist_id) VALUES ('${this.name}', ${this.artist_id});`,
            [], 'get'
        );
    }

    async createAlbum()
    {
        if (!this.name) {
            alert("Veuillez entrer un nom de album");
        }

        let stopError = false;
        let data = false;

        if (this.artist_id) {
            data = true;
            let artist = await Artist.searchid(this.artist_id);
            console.log(artist);
            if (artist) {
                console.log(artist.rowid);
                this.artist_id = artist.rowid;
            }
            else {
                this.artist_id = null;
                alert("Aucun artiste correspondant n'a été trouvé, veuillez le créer au préalable.");
                stopError = true;
            }
        }

        if (!this.release_date) {
            this.release_date = new Date(Date.now()).toUTCString();
        }

        if (stopError === false && data === true) {
            document.getElementsByClassName("container")[0].remove();
            try {
                await this.create();
                alert("Album créé avec succès");
            }
            catch (e) {
                alert("Erreur lors de la création de l'album");
            }

        }
        else if (this.name) {
            alert("Erreur lors de la création du titre.\nVeuillez vérifier les données entrées.");
        }


    }
}
