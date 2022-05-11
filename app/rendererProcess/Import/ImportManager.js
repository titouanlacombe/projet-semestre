import { FileIterator } from "./FileIterator.js";
import { File } from "../Models/File.js";

export class ImportManager
{
	static async import(path)
	{
		let file_it = new FileIterator(true);
		await file_it.start(path);

		do {
			// Ignore directories
			// TODO ignore non recognised files
			if (file_it.get().isDir) {
				continue;
			}

			await this.import_file(file_it.get());
		}
		while (file_it.iterate());
	}

	static async import_file(file)
	{
		let clean_path = JSON.stringify(file.path);

		let entry = await File.get(`WHERE path = ${clean_path}`);
		if (entry) {
			// console.log(`File ${file.path} already exists, skipping import`);
			return;
		}

		File.create({
			path: clean_path,
			imported_at: Date.now().toUTCString()
		});
	}
}
