const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getFiles: async (fPath) => ipcRenderer.invoke('getFiles', fPath),
    getHomeDir: () => ipcRenderer.invoke('getHomeDir'),
    systemDialog: async (params) => ipcRenderer.invoke('systemDialog', params),
    dropDB: async () => ipcRenderer.invoke('dropDB'),
    sql: async (sql, params, method) => ipcRenderer.invoke('sql', sql, params, method),
    // Ajouter
    onNewTitle: (callback) => ipcRenderer.on('new-title', callback),
    onNewAlbum: (callback) => ipcRenderer.on('new-album', callback),
    onNewArtist: (callback) => ipcRenderer.on('new-artist', callback),
    onNewBand: (callback) => ipcRenderer.on('new-band', callback),
    // Voir
    onDisplayTitles: (callback) => ipcRenderer.on('display-title', callback),
    onDisplayArtists: (callback) => ipcRenderer.on('display-artist', callback),
    onDisplayAlbums: (callback) => ipcRenderer.on('display-album', callback),
    onDisplayBands: (callback) => ipcRenderer.on('display-band', callback),

});
