const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

app.whenReady().then(() =>
{
    // Load API
    // let files = fs.readdirSync(".");
    ipcMain.handle('dialog:openFile', () => { return ["hello"]; });

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
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.resolve('app/preload.js'),
            nodeIntegration: true,
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
