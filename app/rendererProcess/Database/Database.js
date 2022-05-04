export class Database
{
	static version = "0.1";

	static async getVersion()
	{
		await this.sql("PRAGMA user_version", [], "get");
	}

	static async dropDatabase()
	{
		await window.electronAPI.dropDB();
		console.log("Droped Database");
	}

	// TODO implement
	// Create tables & insert static data
	static async seedDatabase()
	{
		let requests = [
			`PRAGMA user_version = ${this.version}`,
			`CREATE TABLE albums (
				name TEXT NOT NULL
			);`,
			`INSERT INTO albums VALUES ('Mezzanine')`,
		];

		for (let request of requests) {
			await this.sql(request);
		}

		console.log("Seeded Database");
	}

	static async sql(sql, params = [], method = "run")
	{
		return window.electronAPI.sql(sql, params, method);
	}

	static async initDB()
	{
		// Do nothing if DB is at the right version
		let dbver = await this.getVersion();
		if (dbver == this.version) {
			return;
		}

		console.log("Warning: DB version missmatch: ", dbver, this.version);
		await this.dropDatabase();
		await this.seedDatabase();

		console.log(await this.sql("select * from albums", [], "all"));
	}
}
