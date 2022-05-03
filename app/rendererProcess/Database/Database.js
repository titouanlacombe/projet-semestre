export class Database
{
	// TODO implement
	// Create tables & insert static data
	static async seedDatabase()
	{
		console.log("Seeding database...");

		let result = await window.electronAPI.runSQL("run", `
			CREATE TABLE albums (
				id INTEGER PRIMARY KEY,
				name TEXT NOT NULL,
			);
		`, []);

		console.log("Seeding complete, results:");
		console.log(result);
	}
}
