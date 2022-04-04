const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

app.whenReady().then(() =>
{
	// Load API
	ipcMain.handle('getFiles', (event, fPath) =>
	{
		return fs.readdirSync(fPath);
	});

	// Framework
	createWindow();

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
		webPreferences: {
			preload: path.resolve('app/preload.js'),
		}
	});

	win.loadFile('app/index.html');
}

app.on('window-all-closed', () =>
{
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
