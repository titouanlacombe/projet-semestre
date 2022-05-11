import { Database } from "../Database/Database.js";
import { Model } from "./Model.js";

export class Album extends Model
{
	static table = "albums";

	static async search(name)
	{
		return this.all(`WHERE name LIKE '%${name}%'`);
	}

	async titles()
	{
		return Database.sql(`
			SELECT * FROM titles WHERE album_id = ${this._rowid_};`,
			[], "all"
		);
	}
}
