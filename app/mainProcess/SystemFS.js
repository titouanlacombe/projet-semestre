const fs = require('fs');

module.exports = {
	"getFiles": async function getFiles(dirPath)
	{
		// TODO remove both use of sync to gain more performance
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
};
