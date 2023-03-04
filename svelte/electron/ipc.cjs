const applicationHandlers = require('./ipc-main/application.cjs');

module.exports = (app, win, auth, env) => {
	applicationHandlers(app, win, auth, env);
};
