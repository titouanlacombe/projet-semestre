const sqlite3 = require('sqlite3');

class Database
{
	static filePath = "./Database.db";

	constructor()
	{
		this.connexion = new sqlite3.Database(Database.filePath, (err) =>
		{
			if (err) {
				console.error('Could not connect to database', err);
			} else {
				console.log('Connected to database');
			}
		});
	}

	runSql(method, sql, params)
	{
		// method precondition
		if (["run", "get", "all"].indexOf(method) == -1) {
			throw new Error(`Database unknown method: '${method}'`);
		}

		// connexion precondition
		if (!this.connexion) {
			throw new Error('Error: database not loaded');
		}

		return new Promise(resolve =>
		{
			this.connexion[method](sql, params, (response) => { resolve(response); });
		});
	}
}

module.exports = new Database();
