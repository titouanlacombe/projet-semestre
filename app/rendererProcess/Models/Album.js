import { Database } from "../Database/Database.js";
import { Model } from "./Model.js";
import { Artist } from "./Artist.js";
import { Title } from "./Title.js";

export class Album extends Model
{
    static table = "albums";

    static async getAlbums()
    {
        return Album.all();
    }

    static async searchid(name, artist_id)
    {

        return Database.sql(`
			SELECT rowid FROM albums WHERE name LIKE '${name}' AND artist_id = ${artist_id}; `,
            [], 'get'
        );
    }

    async artist()
    {
        return Artist.get(`WHERE rowid = ${this.artist_id}`);
    }

    // TODO : Tester searchbis au lieu de searchid
    static async searchBis(name, artist_id)
    {
        return this.get(`WHERE name is '${name}' AND artist_id = ${artist_id} `);
    }

    async update()
    {
        let artist = await Artist.searchid(this.artist_id);
        if (artist) {
            this.artist_id = artist.rowid;
        }
        if (!this.released_at || this.released_at === undefined)
            this.released_at = null;
        else
            this.released_at = `'${this.released_at}'`;
        console.log(this);

        return Database.sql(`
            UPDATE albums SET name = '${this.name}', artist_id = ${this.artist_id}, released_at = ${this.released_at} WHERE rowid = ${this.rowid}; `
        );
    }

    static async search(name)
    {
        return this.all(`WHERE name LIKE '%${name}%'`);
    }

    async removeAlbum()
    {
        return Database.sql(`
            DELETE FROM albums WHERE rowid = ${this.rowid}`,
            [], 'get'
        );
    }

    async titles()
    {
        return Title.all(`WHERE album_id = ${this.rowid} `);
    }

    async create()
    {
        return Database.sql(`
            INSERT INTO albums(name, artist_id) VALUES('${this.name}', ${this.artist_id}); `,
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
