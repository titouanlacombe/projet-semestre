import { Model } from "./Model";

export class Band extends Model
{
	constructor()
	{
		super("bands");
	}

	search(name)
	{
		await this.all(`WHERE name LIKE '%${name}%'`);
	}

	artists()
	{
		// TODO
		return null;
	}
}
