import { Model } from "./Model.js";

export class Album extends Model
{
	static table = "albums";

	static async search(name)
	{
		await this.all(`WHERE name LIKE '%${name}%'`);
	}

	titles()
	{
		// TODO
		return [];
	}
}
