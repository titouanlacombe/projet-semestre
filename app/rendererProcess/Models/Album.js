import { Database } from "../Database/Database.js";
import { Model } from "./Model.js";

export class Album extends Model
{
    static table = "albums";

    static async searchid(name, artist_id)
    {

        return Database.sql(`
			SELECT rowid FROM albums WHERE name LIKE '${name}' AND rowid= ${artist_id};`,
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
}
