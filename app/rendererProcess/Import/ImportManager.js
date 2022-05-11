import { FileIterator } from "./FileIterator.js";
import { File } from "../Models/File.js";
import { extension } from "../Utils/Path.js";

export class ImportManager
{
	static extension_whitelist = [
		"mp3",
		"flac",
	];

	static import(path)
	{
		// Launch file iterator on path with import_file callback
		new FileIterator(this.import_file, true).start(path);
	}

	static async import_file(file)
	{
		// Ignore non recognised files
		let ext = extension(file_it.get().path);
		if (!this.extension_whitelist.includes(ext)) {
			console.log(`Ignoring ${file_it.get().path} because of extension whitelist (${ext})`);
			return;
		}

		let clean_path = JSON.stringify(file.path);

		let entry = await File.get(`WHERE path = ${clean_path}`);
		if (entry) {
			// console.log(`File ${file.path} already exists, skipping import`);
			return;
		}

		File.create({
			path: clean_path,
			imported_at: JSON.stringify(new Date().toString())
		});
	}
}
