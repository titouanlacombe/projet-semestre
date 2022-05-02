const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getFiles: (fPath) => ipcRenderer.invoke('getFiles', fPath),
    getHomeDir: () => ipcRenderer.invoke('getHomeDir'),
    loadAlbum: () => ipcRenderer.invoke('loadAlbum'),
    loadTitle: () => ipcRenderer.invoke('loadTitle'),
})
