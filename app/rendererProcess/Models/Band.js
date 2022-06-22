import { Artist } from "./Artist.js";
import { Model } from "./Model.js";
import { Database } from "../Database/Database.js";

export class Band extends Model
{
    static table = "bands";

    static async searchid(name)
    {
        return Database.sql(`
            SELECT ROWID FROM bands WHERE name LIKE '%${name}%'`,
            [], 'get'
        );

    }

    static async getBands()
    {
        return this.all();
    }

    static async search(name)
    {
        return this.all(`WHERE name LIKE '%${name}%'`);
    }

    async artists()
    {
        return Artist.all(`WHERE band_id = ${this.rowid}`);
    }

    async removeArtist(id)
    {
        return Database.sql(`
            UPDATE artists SET band_id = NULL WHERE rowid = ${id}`,
        );
    }

    async create()
    {
        return Database.sql(`
            INSERT INTO bands(name) VALUES('${this.name}')`,
            [], 'get'
        );
    }

    async createBand()
    {
        if (!this.name) {
            alert("Veuillez entrer un nom de groupe");
        }
        else {
            document.getElementsByClassName("container")[0].remove();
            try {
                await this.create();
                alert("Groupe créé avec succès.");
            }
            catch (error) {
                alert("Erreur lors de la création du groupe.");
            }
        }
    }
}
