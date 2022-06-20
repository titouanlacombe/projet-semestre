import { Model } from "./Model.js";
import { Database } from "../Database/Database.js";

export class File extends Model
{
    static table = "files";

    static async searchid(path)
    {
        return Database.sql(`
            SELECT ROWID FROM files WHERE path LIKE '%${path}%'`, [], 'get'
        );
    }

    static async search(path)
    {
        return this.all(`WHERE path LIKE '%${path}%'`);
    }

}
