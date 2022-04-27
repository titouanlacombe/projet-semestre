export class Model
{

}

export function testDatabase()
{
	let result = window.electronAPI.runSQL("run", `
		CREATE TABLE albums (
			id INTEGER PRIMARY KEY,
			name TEXT NOT NULL,
		);
	`, []);
	console.log(result);
}
