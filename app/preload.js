const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
	getFiles: async (fPath) => ipcRenderer.invoke('getFiles', fPath),
	getHomeDir: () => ipcRenderer.invoke('getHomeDir'),
	systemDialog: async (params) => ipcRenderer.invoke('systemDialog', params),
	dropDB: async () => ipcRenderer.invoke('dropDB'),
	sql: async (sql, params, method) => ipcRenderer.invoke('sql', sql, params, method),
});
