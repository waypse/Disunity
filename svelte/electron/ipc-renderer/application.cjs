const { ipcRenderer: ipc } = require('electron');

// handle window
const toggleFullscreen = (_) => ipc.invoke('toggle-fullscreen');
const minimize = (_) => ipc.invoke('minimize');
const maximize = (_) => ipc.invoke('maximize');
const auth = (key, values) => ipc.invoke(`auth:${key}`, values);
// quit application
const quit = (_) => ipc.invoke('app-quit');
// handle external links
const externalLink = (href) => ipc.invoke('external-link', href);
const hide = (_) => ipc.invoke('hide');
const send = (channel, data) => {
	ipcRenderer.send(channel, data);
};
const sendSync = (channel, data) => {
	ipcRenderer.sendSync(channel, data);
};
const receive = (channel, func) => {
	ipcRenderer.on(channel, (event, ...args) => func(...args));
};

// exports
module.exports = {
	hide,
	auth,
	quit,
	minimize,
	maximize,
	toggleFullscreen,
	externalLink,
	send,
	sendSync,
	receive,
};
