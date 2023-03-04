const windowStateManager = require('electron-window-state');
const contextMenu = require('electron-context-menu');
const { app, BrowserWindow, ipcMain, Menu, Tray } = require('electron');
const serve = require('electron-serve');
const path = require('path');
const Store = require('electron-store');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

try {
	require('electron-reloader')(module);
} catch (e) {
	console.error(e);
}

const store = new Store({
	name: 'auth',
	defaults: {
		auth: {
			access_token: '',
			refresh_token: '',
		},
	},
});

const env = new Store({
	name: 'environment',
	defaults: { ...process.env },
});

const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 5173;
const dev = !app.isPackaged;
let mainWindow;

function createWindow() {
	let windowState = windowStateManager({
		defaultWidth: 800,
		defaultHeight: 600,
	});

	const mainWindow = new BrowserWindow({
		backgroundColor: 'rgb(29, 29, 29)',
		frame: false,
		autoHideMenuBar: true,
		trafficLightPosition: {
			x: 17,
			y: 32,
		},
		minHeight: 500,
		minWidth: 950,
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: dev,
			preload: path.join(__dirname, 'preload.cjs'),
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
	});

	windowState.manage(mainWindow);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.on('close', () => {
		windowState.saveState(mainWindow);
	});

	ipcMain.on('close', (event) => {
		windowState.saveState(mainWindow);
		mainWindow.close();
	});

	return mainWindow;
}

function createTray() {
	const tray = new Tray(path.join(__dirname, '../static/favicon.ico'));
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Show App',
			click: function () {
				mainWindow.show();
			},
		},
		{
			label: 'Quit',
			click: function () {
				if (process.platform !== 'darwin') app.quit();
			},
		},
	]);

	tray.setToolTip('This is my application.');
	tray.setContextMenu(contextMenu);
	tray.on('click', () => {
		mainWindow.show();
	});
}

contextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyImage: false,
	prepend: (defaultActions, params, browserWindow) => [
		{
			label: 'Make App 💻',
		},
	],
});

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

function createMainWindow() {
	mainWindow = createWindow();
	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (dev) loadVite(port);
	else serveURL(mainWindow);
}

app.once('ready', () => {
	createMainWindow();

	createTray();

	require('./ipc.cjs')(app, mainWindow, store, env);
});
app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow();
	}
});
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
