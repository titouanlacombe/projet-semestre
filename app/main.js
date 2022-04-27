const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const db = require('./main/Database');

app.whenReady().then(() =>
{
	// Load API
	ipcMain.handle('runSQL', async (event, method, sql, params) =>
	{
		await new Promise(resolve =>
		{
			db[method](sql, params, response => resolve(response));
		});
	});

	ipcMain.handle('getFiles', (event, dirPath) =>
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
				console.log("Error: failed to generate file object for '" + fullPath + "' cause: ");
				console.log(error);
			}
		}

		return results;
	});

	ipcMain.handle('getHomeDir', () =>
	{
		return app.getPath('home');
	});

	// Framework
	createWindow();

	// For macOS
	app.on('activate', () =>
	{
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

function createWindow()
{
	const win = new BrowserWindow({
		icon: "./resources/icon.png",
		webPreferences: {
			preload: path.resolve('app/preload.js'),
		}
	});

	win.maximize();

	win.loadFile('app/index.html');
}

app.on('window-all-closed', () =>
{
	// For macOS
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
