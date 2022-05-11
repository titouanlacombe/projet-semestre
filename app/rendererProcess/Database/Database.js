export class Database
{
	static version = 3;

	static async getVersion()
	{
		// Uncomment when experimenting with DB
		return null;
		return (await this.sql("PRAGMA user_version", [], "get")).user_version;
	}

	static async drop()
	{
		await window.electronAPI.dropDB();
		console.log("Droped Database");
	}

	// Create tables & insert static data
	static async seed()
	{
		let requests = [
			// --- Database version ---
			`PRAGMA user_version = ${this.version}`,

			// --- albums ---
			`CREATE TABLE albums (
				name TEXT NOT NULL,
				released_at TEXT DEFAULT NULL
			);`,
			`INSERT INTO albums(name) VALUES ('Mezzanine')`,

			// --- bands ---
			`CREATE TABLE bands (
				name TEXT NOT NULL
			);`,

			// --- artists ---
			`CREATE TABLE artists (
				firstname TEXT,
				lastname TEXT,
				stagename TEXT,
				band_id INTEGER
			);`,

			// --- worked_on ---
			`CREATE TABLE worked_on (
				artist_id INTEGER NOT NULL,
				title_id INTEGER NOT NULL,
				jobtype TEXT NOT NULL
			);`,

			// --- titles ---
			`CREATE TABLE titles (
				name TEXT NOT NULL,
				genre TEXT,
				file_id INTEGER NOT NULL,
				album_id INTEGER,
				released_at TEXT
			);`,

			// --- files ---
			`CREATE TABLE files (
				path TEXT NOT NULL,
				imported_at TEXT NOT NULL
			);`,

			// --- genres ---
			`CREATE TABLE genres (
				name TEXT NOT NULL
			);`,
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

	static async init()
	{
		// Do nothing if DB is at the right version
		let dbver = await this.getVersion();
		if (dbver == this.version) {
			return;
		}

		console.log("Warning: DB version missmatch: ", dbver, this.version);
		await this.drop();
		await this.seed();
	}

	static async reset()
	{
		await this.drop();
		await this.init();
	}
}

window.addEventListener('DOMContentLoaded', () =>
{
	Database.init();
});
