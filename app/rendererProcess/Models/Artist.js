import { Model } from "./Model";

export class Artist extends Model
{
	constructor()
	{
		super("artists");
	}

	search(name)
	{
		// TODO
		await this.all(`WHERE name LIKE '%${name}%'`);
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
