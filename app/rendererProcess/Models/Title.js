import { Model } from "./Model";

export class Title extends Model
{
	constructor()
	{
		super("titles");
	}

	search(name)
	{
		await this.all(`WHERE name LIKE '%${name}%'`);
	}

	artists()
	{
		// TODO
		return [];
	}

	genre()
	{
		// TODO
		return null;
	}

	album()
	{
		// TODO
		return null;
	}

	file()
	{
		// TODO
		return null;
	}

	// Search with title name & artists name(s) & band names
	// TODO move elsewere
	multisearch()
	{
		return [];
	}
}
