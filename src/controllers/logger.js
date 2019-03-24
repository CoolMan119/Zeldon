const chalk = require("chalk");

class Logger {
    constructor(obj) {
        this.showDebug = obj["showDebug"];
    }
    _log(prefix, message) {
        (console._original && console._original.log
            ? console._original.log
            : console.log)(`${prefix} ${message}`);
    }
    info(msg) {
        this._log(chalk.green("[INFO]"), msg);
    }
    warn(msg) {
        this._log(chalk.yellow("[WARN]"), msg);
    }
    severe(msg) {
        this._log(chalk.red("[SEVERE]"), msg);
    }
    debug(msg) {
        if (this.showDebug) {
            this._log("[DEBUG] ", msg);
        }
    }
}

module.exports = Logger;