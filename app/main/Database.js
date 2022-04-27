const sqlite3 = require('sqlite3');

class Database
{
	static filePath = "./Database.db";

	constructor()
	{
		this.connexion = new sqlite3.Database(Database.filePath, (err) =>
		{
			if (err) {
				console.log('Could not connect to database', err);
			} else {
				console.log('Connected to database');
			}
		});
	}

	run(sql, params, callback)
	{
		if (!this.connexion) {
			throw new Error('Error: database not loaded');
		}

		return this.connexion.run(sql, params, callback);
	}
}

module.exports = new Database();
