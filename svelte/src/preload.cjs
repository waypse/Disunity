// preload.cjs

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronApi', {
	send: (channel, data) => {
		ipcRenderer.send(channel, data);
	},
	sendSync: (channel, data) => {
		ipcRenderer.sendSync(channel, data);
	},
	receive: (channel, func) => {
		ipcRenderer.on(channel, (event, ...args) => func(...args));
	},
	getStoreValue: async (key) => {
		return ipcRenderer.invoke('getStoreValue', key);
	},
	clearStore: () => {
		return ipcRenderer.send('clearStore');
	},
	setStoreValue: (key, value) => {
		return ipcRenderer.send('setStoreValue', key, value);
	},
});
