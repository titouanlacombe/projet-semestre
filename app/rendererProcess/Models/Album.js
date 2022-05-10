import { Model } from "./Model";

export class Album extends Model
{
	constructor()
	{
		super("albums");
	}

	search(name)
	{
		await this.all(`WHERE name LIKE '%${name}%'`);
	}
}
