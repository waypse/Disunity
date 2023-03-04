// preload.cjs

const { contextBridge, ipcRenderer } = require('electron');
const applicationMethods = require('./ipc-renderer/application.cjs');

contextBridge.exposeInMainWorld('electronApi', {
	...applicationMethods,
});
