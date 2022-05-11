import { Model } from "./Model.js";
import { Band } from "./Band.js";

export class Artist extends Model
{
	static table = "artists";

	static async search(name)
	{
		let promise1 = this.all(`WHERE firstname LIKE '%${name}%'`);
		let promise2 = this.all(`WHERE lastname LIKE '%${name}%'`);
		let promise3 = this.all(`WHERE stagename LIKE '%${name}%'`);

		let results = [];
		results.concat(await promise1);
		results.concat(await promise2);
		results.concat(await promise3);

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

	async titles()
	{
		return Database.sql(`
			SELECT * FROM titles
			LEFT JOIN worked_on ON title_id = title._rowid_
			WHERE artist_id = ${this._rowid_};`,
			[], "all"
		);
	}

	async band()
	{
		return Band.find(this.band_id);
	}
}
