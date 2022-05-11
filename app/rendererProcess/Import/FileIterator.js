// TODO Transform iterator to use callback each time file is found
export class FileIterator
{
	constructor(recursive = true)
	{
		this.recursive = recursive;
	}

	async start(path)
	{
		this.queue = [];

		// Init queue
		await this.open_dir(path);
	}

	async open_dir(path)
	{
		let files = await window.electronAPI.getFiles(path);
		for (const file of files) {

			// If recursive mode && directory found
			if (this.recursive && file.isDir) {
				await this.open_dir(path + "/" + file.name);
			}

			// Add file to queue
			this.queue.push(file);
		}
	}

	iterate()
	{
		this.queue.shift();
		return this.queue.length > 0;
	}

	get()
	{
		return this.queue[0] ?? null;
	}
}
