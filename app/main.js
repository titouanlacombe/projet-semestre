const { app, BrowserWindow } = require('electron');
const path = require('path');
const sidebar = require('./Sidebar');

function createWindow()
{
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.resolve('app/preload.js'),
            nodeIntegration: true,
        }
    });

    win.loadFile('app/index.html');
}

app.whenReady().then(() =>
{
    createWindow();

    app.on('activate', () =>
    {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    console.log(sidebar);
    sidebar.load();
});

app.on('window-all-closed', () =>
{
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
