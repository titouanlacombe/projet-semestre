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
		return this.generateModel(await this.select(request, params, 'get'));
	}

	static async all(request, params)
	{
		let objects = await this.select(request, params, 'all');

		let results = [];
		for (const iterator of objects) {
			results.push(this.generateModel(iterator));
		}

		return results;
	}

	static async select(request, params, method)
	{
		return Database.sql(`SELECT * FROM ${this.table} ${request}`, params, method);
	}

	static async create(object)
	{
		let keys = Object.keys(object);

		let values = [];
		for (const key of keys) {
			values.push(object[key]);
		}

		Database.sql(`
			INSERT INTO ${this.table}(${keys.join(", ")})
			VALUES (${values.join(", ")})
		`);
	}
}
