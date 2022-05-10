import { Model } from "./Model";

export class Genre extends Model
{
	constructor()
	{
		super("genres");
	}

	search(name)
	{
		await this.all(`WHERE name LIKE '%${name}%'`);
	}

	titles()
	{
		// TODO
		return [];
	}
}
