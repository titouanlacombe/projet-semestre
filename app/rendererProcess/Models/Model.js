import { Database } from "../Database/Database";

export class Model
{
	constructor(table)
	{
		this.table = table;
	}

	async find(id)
	{
		await this.get(`WHERE _rowid_ = ${id}`, []);
	}

	async get(request, params)
	{
		await this.sql(request, params, 'get');
	}

	async all(request, params)
	{
		await this.sql(request, params, 'all');
	}

	async sql(request, params, method)
	{
		await Database.sql(`SELECT * FROM ${this.table} ${request}`, params, method);
	}
}
