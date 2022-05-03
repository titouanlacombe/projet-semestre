export class Database
{
	// TODO implement
	// Create tables & insert static data
	static seedDatabase()
	{
		console.log("Seeding database...");

		let result = window.electronAPI.runSQL("run", `
			CREATE TABLE albums (
				id INTEGER PRIMARY KEY,
				name TEXT NOT NULL,
			);
		`, []);

		console.log("Seeding complete, results:");
		console.log(result);
	}
}
