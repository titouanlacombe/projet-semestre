import { Artist } from "./Artist.js";
import { Model } from "./Model.js";

export class Band extends Model
{
	static table = "bands";

	static async search(name)
	{
		return this.all(`WHERE name LIKE '%${name}%'`);
	}

	async artists()
	{
		return Artist.all(`WHERE band_id = ${this._rowid_}`);
	}
}
