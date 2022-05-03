const fs = require('fs');

module.exports = {
	"getFiles": function getFiles(dirPath)
	{
		const files = fs.readdirSync(dirPath);

		let results = [];
		for (const file of files) {

			let fullPath = dirPath + "/" + file;

			try {
				results.push({
					"name": file,
					"isDir": fs.statSync(fullPath).isDirectory()
				});
			}
			catch (error) {
				console.error("Error: failed to generate file object for '" + fullPath + "' cause: ");
				console.error(error);
			}
		}

		return results;
	},

	"getHomeDir": function getHomeDir()
	{
		return app.getPath('home');
	},
};
