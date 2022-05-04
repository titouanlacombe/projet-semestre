const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
	// method can be run, get, all
	getFiles: (fPath) => ipcRenderer.invoke('getFiles', fPath),
	getHomeDir: () => ipcRenderer.invoke('getHomeDir'),
	dropDB: () => ipcRenderer.invoke('dropDB'),
	sql: (sql, params, method) => ipcRenderer.invoke('sql', sql, params, method),
});
