import { Model } from "./Model.js";
import { Band } from "./Band.js";
import { Database } from "../Database/Database.js";
import { Title } from "./Title.js";
import { Album } from "./Album.js";

export class Artist extends Model
{
    static table = "artists";

    static async searchid(name)
    {
        return Database.sql(`
            SELECT ROWID FROM artists WHERE stagename LIKE '${name}'`,
            [], 'get'
        );

    }

    static async getArtists()
    {
        return this.all();
    }

    static async searchBis(id)
    {
        return this.get(`WHERE rowid = ${id}`);
    }

    async update()
    {

        if (this.band_id === '') this.band_id = null;
        else {
            let bandId = await Band.searchid(this.band_id);
            if (bandId) {
                this.band_id = bandId.rowid;
            }
        }
        return Database.sql(`
            UPDATE artists 
            SET stagename = '${this.stagename}',
            firstname = '${this.firstname}',
            lastname = '${this.lastname}',
            band_id = ${this.band_id}
            WHERE rowid = ${this.rowid}`);
    }

    static async search(name)
    {
        let promise1 = this.all(`WHERE firstname LIKE '%${name}%'`);
        let promise2 = this.all(`WHERE lastname LIKE '%${name}%'`);
        let promise3 = this.all(`WHERE stagename LIKE '%${name}%'`);

        let results = [];
        let artist = await promise1;
        results = results.concat(artist);

        artist = await promise2;
        if (artist.length > 0 && (results.some(element =>
        {
            return (element.firstname === artist.firstname)
        })))
            results = results.concat(artist);

        artist = await promise3;
        if (artist.length > 0 && (results.some(element =>
        {
            return (element.firstname === artist.firstname)
        })))
            results = results.concat(artist);

        return results;
    }

    getCleanName()
    {
        if (!this.firstname && !this.lastname) {
            return this.stagename;
        }

        let name = `${this.firstname} ${this.lastname}`;
        name.trim();
        if (this.stagename) {
            name += ` (${this.stagename})`
        }

        return name;
    }

    async albums()
    {
        return Album.all(`WHERE artist_id = ${this.rowid}`);
    }

    async titles()
    {
        return Title.all(`WHERE album_id = (SELECT rowid from albums where artist_id = ${this.rowid}) `);
    }

    async band()
    {
        return Band.find(this.band_id);
    }

    async removeArtist()
    {
        return Database.sql(`
            DELETE FROM artists WHERE rowid = ${this.rowid}`
        );
    }

    async create()
    {

        let keys = Object.keys(this);
        for (const key of keys) {
            if (this[key] === '' || this[key] === null || this[key] === undefined) {
                this[key] = 'null';
            }
        }

        Database.sql(`
			INSERT INTO artists (firstname, lastname, stagename, band_id)
            VALUES ('${this.firstname}', '${this.lastname}', '${this.stagename}', ${this.band_id});`
        );
    }

    async createArtist()
    {
        console.log(this);

        if (!this) {
            return null;
        }

        let stopError = false;
        let data = false;

        if (this.stagename) {
            data = true;

        } else if (this.firstname || this.lastname) {
            data = true;
            this.stagename = `${this.firstname} ${this.lastname}`;
        }
        else {
            alert("Veuillez entrer un nom.");
        }


        // get band_id from db
        if (this.band_id) {
            let band = await Band.searchid(this.band_id);
            if (band) {
                this.band_id = band.rowid;
            }
            else {
                stopError = true;
                this.band_id = null;
                alert("Aucun groupe correspondant trouvé, veuillez le créer au préalable.");
            }
        }

        if (stopError === false && data === true) {

            try {
                await this.create();
                alert("Artiste créé avec succès.");
            }
            catch (error) {
                alert("Erreur lors de la création de l'artiste.");
            }
        }
        else if (this.firstname || this.stagename) {
            alert("Erreur lors de la création de l'artiste.\nVeuillez vérifier les données entrées.");
        }

        return null;
    }
}
