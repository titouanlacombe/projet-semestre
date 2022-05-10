import { Model } from "./Model.js";

export class Band extends Model
{
	static table = "bands";

	static async search(name)
	{
		await this.all(`WHERE name LIKE '%${name}%'`);
	}

	artists()
	{
		// TODO
		return null;
	}
}
