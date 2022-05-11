import { Database } from "../Database/Database.js";

export class Model
{
	static table = undefined;

	static async find(id)
	{
		return this.get(`WHERE _rowid_ = ${id}`, []);
	}

	static generateModel(object)
	{
		if (!object) {
			return null;
		}

		let model = new this();
		for (const key in object) {
			model[key] = object[key];
		}
		return model;
	}

	static async get(request, params)
	{
		return this.generateModel(await this.sql(request, params, 'get'));
	}

	static async all(request, params)
	{
		let objects = await this.sql(request, params, 'all');

		let results = [];
		for (const iterator of objects) {
			results.push(this.generateModel(iterator));
		}

		return results;
	}

	static async sql(request, params, method)
	{
		return Database.sql(`SELECT * FROM ${this.table} ${request}`, params, method);
	}
}
