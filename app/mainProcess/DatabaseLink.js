const sqlite3 = require('sqlite3');
const fs = require('fs');

class Database
{
	constructor()
	{
		this.filePath = "./Database.db";
		this.connect();
	}

	connect()
	{
		this.connexion = new sqlite3.Database(this.filePath, (err) =>
		{
			if (err) {
				throw err;
			} else {
				console.log('Connected to database');
			}
		});
	}

	async disconnect()
	{
		if (!this.connexion) {
			return;
		}

		await new Promise((resolve, reject) =>
		{
			this.connexion.close((err) =>
			{
				if (err) {
					reject(err);
				}

				resolve();
			});
		});

		console.log('Disconnected to database');
	}

	async drop()
	{
		await this.disconnect();

		// Removing file
		fs.rmSync(this.filePath);
		console.log('Dropped database');

		this.connect();
	}

	sql(sql, params, method)
	{
		// method precondition
		if (["run", "get", "all"].indexOf(method) == -1) {
			throw new Error(`SQL unknown method: '${method}'`);
		}

		// connexion precondition
		if (!this.connexion) {
			throw new Error('Error: database not loaded');
		}

		// console.log("Executing " + method);
		console.log("SQL: " + sql);
		// console.log("Values", params);

		return new Promise((resolve, reject) =>
		{
			this.connexion[method](sql, params, (err, result) =>
			{
				console.log(err, result);

				if (err) {
					reject(err);
				}

				resolve(result);
			});
		});
	}
}

module.exports = new Database();
