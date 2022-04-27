const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
	// method can be run, get, all
	runSQL: (method, sql, params) => ipcRenderer.invoke('runSQL', method, sql, params),
	getFiles: (fPath) => ipcRenderer.invoke('getFiles', fPath),
	getHomeDir: () => ipcRenderer.invoke('getHomeDir'),
})
