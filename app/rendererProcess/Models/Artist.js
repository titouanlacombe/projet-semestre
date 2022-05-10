import { Model } from "./Model.js";

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
		// TODO
	}

	titles()
	{
		// TODO
		return [];
	}

	band()
	{
		// TODO
		return null;
	}
}
