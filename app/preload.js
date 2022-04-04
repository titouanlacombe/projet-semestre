const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
	getFiles: (fPath) => ipcRenderer.invoke('getFiles', fPath)
})
