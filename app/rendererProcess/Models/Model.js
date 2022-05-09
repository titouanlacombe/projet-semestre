import { Database } from "../Database/Database";

export class Model
{
	constructor(table, rows)
	{
		this.table = table;
		this.rows = rows;
	}

	async get(id)
	{
		await Database.sql(`SELECT * FROM ${this.table} WHERE _rowid_ = ${id}`);
	}
}
