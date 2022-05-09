import { Model } from "./Model";

export class Album extends Model
{
	constructor()
	{
		super("albums", [
			"name",
			"released_at",
		]);
	}
}
