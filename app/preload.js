const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
	// method can be run, get, all
	getFiles: (fPath) => ipcRenderer.invoke('getFiles', fPath),
	getHomeDir: () => ipcRenderer.invoke('getHomeDir'),
	dropDB: async () => ipcRenderer.invoke('dropDB'),
	sql: async (sql, params, method) => ipcRenderer.invoke('sql', sql, params, method),
});
