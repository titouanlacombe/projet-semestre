import { Model } from "./Model.js";
import { Title } from "./Title.js";
import { Database } from "../Database/Database.js";

export class Genre extends Model
{
    static table = "genres";

    constructor()
    {
        super("genres");
    }

    static async searchid(name)
    {
        return Database.sql(`
            SELECT ROWID FROM genres WHERE name LIKE '%${name}%'`, [], 'get'
        );
    }

    static async searchBis(id)
    {
        return this.get(`WHERE rowid = ${id}`);
    }

    static async getGenres()
    {
        return Genre.all();
    }

    static async search(name)
    {
        return this.all(`WHERE name LIKE '%${name}%'`);
    }

    async titles()
    {
        return Title.all(`WHERE genre_id = ${this._rowid_}`);
    }
}
