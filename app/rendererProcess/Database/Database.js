export class Database
{
	// TODO implement
	// TODO https://www.sqlitetutorial.net/
	// Create tables & insert static data
	static async seedDatabase()
	{
		console.log("Seeding database...");

		await window.electronAPI.runSQL("run", `
			CREATE TABLE albums (
				id INTEGER PRIMARY KEY,
				name TEXT NOT NULL
			);
		`, []);

		await window.electronAPI.runSQL("run", `
			INSERT INTO albums VALUES ('Mezzanine');
		`, []);

		console.log("Seeding complete, results:");
		console.log(result);
	}
}
