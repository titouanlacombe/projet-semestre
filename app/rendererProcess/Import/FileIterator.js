export class FileIterator
{
	constructor(callback, recursive = true)
	{
		this.recursive = recursive;
		this.callback = callback;
	}

	start(path)
	{
		this.queue = [];

		// Init queue
		this.open_dir(path);
	}

	async open_dir(path)
	{
		let files = await window.electronAPI.getFiles(path);
		for (const file of files) {

			// Add path because user doesn't have this info
			file.path = path + "/" + file.name;

			if (file.isDir) {
				if (this.recursive) {
					this.open_dir(file.path);
				}

				// Ignore directories
				continue;
			}

			// Callback with file
			this.callback(file);
		}
	}
}
