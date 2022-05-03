const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./mainProcess/DatabaseLink');
const { getFiles, getHomeDir } = require("./mainProcess/SystemFS");

app.whenReady().then(() =>
{
	// Loading API
	ipcMain.handle('getFiles', (event, dirPath) => getFiles(dirPath));
	ipcMain.handle('getHomeDir', (event) => getHomeDir());

	ipcMain.handle('runSQL', async (event, method, sql, params) =>
	{
		await db.runSql(method, sql, params);
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
