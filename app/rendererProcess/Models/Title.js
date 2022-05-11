import { Genre } from "./Genre.js";
import { Album } from "./Album.js";
import { File } from "./File.js";
import { Model } from "./Model.js";

export class Title extends Model
{
	static table = "titles";

	static async search(name)
	{
		return this.all(`WHERE name LIKE '%${name}%'`);
	}

	async artists()
	{
		return Database.sql(`
			SELECT * FROM artists
			LEFT JOIN worked_on ON artist_id = artists._rowid_
			WHERE title_id = ${this._rowid_};`,
			[], "all"
		);
	}

	async genre()
	{
		return Genre.find(this.genre_id);
	}

	async album()
	{
		return Album.find(this.album_id);
	}

	async file()
	{
		return File.find(this.file_id);
	}
}
