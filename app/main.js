const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./mainProcess/DatabaseLink');
const { getFiles } = require("./mainProcess/SystemFS");

app.whenReady().then(() =>
{
	// --- API ---
	ipcMain.handle('getFiles', (event, dirPath) => getFiles(dirPath));
	ipcMain.handle('getHomeDir', (event) => { return app.getPath('home'); });
	ipcMain.handle('dropDB', async (event) => { await db.drop(); });

	ipcMain.handle('sql', async (event, sql, params, method) =>
	{
		await db.sql(sql, params, method);
	});

	// --- Framework ---
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
