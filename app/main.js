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
