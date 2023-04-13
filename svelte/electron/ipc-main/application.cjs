const { ipcMain: ipc, dialog } = require('electron');
const { getAuth, login, logout, register, currentUser } = require('../ipc-methods/auth.cjs');
const shell = require('electron').shell;

/*
  No need to wrap functions that don't use the app or win object in the module export 
*/
// handle external links
ipc.handle('external-link', (event, href) => shell.openExternal(href));

// ipc calls that requires the app and window object.
module.exports = (app, win, store, env) => {
	ipc.handle('toggle-fullscreen', () => win.setFullScreen(!win.isFullScreen()));
	ipc.handle('minimize', () => win.minimize());
	ipc.handle('maximize', () => {
		if (win.isFullScreen()) {
			win.setFullScreen(false);
			return;
		}
		if (win.isMaximized()) {
			win.unmaximize();
		} else {
			win.maximize();
		}
	});
	ipc.handle('hide', (_) => win.hide());

	ipc.handle('app-quit', (_) => {
		// On OS X it is common for applications and their menu bar
		// to stay active until the user quits explicitly with Cmd + Q
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});

	ipc.handle('auth:get', () => getAuth(store, env));
	ipc.handle('auth:logout', () => logout(store, env));
	ipc.handle('auth:login', (_event, values) => login(store, env, values));
	ipc.handle('auth:register', (_event, values) => register(store, env, values));
	ipc.handle('auth:current-user', () => currentUser(store, env));
};
