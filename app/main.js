const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const db = require('./mainProcess/DatabaseLink');
const { getFiles } = require("./mainProcess/SystemFS");

let mainWindow = null;

app.whenReady().then(() =>
{
	// --- API ---
	// FS
	ipcMain.handle('getFiles', async (event, dirPath) => { return getFiles(dirPath) });
	ipcMain.handle('getHomeDir', (event) => { return app.getPath('home'); });

	// System
	ipcMain.handle('systemDialog', async (event, params) =>
	{
		return dialog.showOpenDialog(mainWindow, { properties: params });
	});

	// DB
	ipcMain.handle('dropDB', async (event) => { return db.drop(); });
	ipcMain.handle('sql', async (event, sql, params, method) =>
	{
		return db.sql(sql, params, method);
	});

	// --- Framework ---
	mainWindow = createWindow();

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
		autoHideMenuBar: true,
		icon: "./resources/icon.png",
		webPreferences: {
			preload: path.resolve('app/preload.js'),
		}
	});

	win.maximize();
	win.loadFile('app/index.html');
	return win;
}

app.on('window-all-closed', () =>
{
	// For macOS
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
