import { Model } from "./Model.js";
import { Title } from "./Title.js";

export class Genre extends Model
{
	constructor()
	{
		super("genres");
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
