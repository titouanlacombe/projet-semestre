const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const db = require('./mainProcess/DatabaseLink');
const { getFiles } = require("./mainProcess/SystemFS");

let mainWindow = null;

const isMac = process.platform === 'darwin'
let menu = null;



const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    // { role: 'fileMenu' }
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    },
    // { role: 'editMenu' }
    {
        label: 'Bibliothèque',
        submenu: [
            {
                label: 'Ajouter',
                submenu: [
                    { label: 'Titre', click: () => mainWindow.webContents.send('update-title', 1) },
                    { label: 'Artiste', click: () => mainWindow.webContents.send('update-artist', 1) },
                    { label: 'Album', click: () => mainWindow.webContents.send('update-album', 1) },
                ]
            }
        ]
    },
    // { role: 'viewMenu' }
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            ...(isMac ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' },
                { role: 'window' }
            ] : [
                { role: 'close' }
            ])
        ]
    }
]

app.whenReady().then(() =>
{
    // Setup the menu
    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

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
        // autoHideMenuBar: true,
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
