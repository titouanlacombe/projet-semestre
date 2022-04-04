const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: (fPath) => ipcRenderer.invoke('dialog:openFile', fPath)
})
