import SimpleNodeLogger from 'simple-node-logger';
import shell from 'shelljs';

const {pwd} = shell;

const opts = {
    errorEventName: 'error',
    logDirectory: `${pwd()}`,
    fileNamePattern: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD'
};

const manager = SimpleNodeLogger.createLogManager();
manager.createConsoleAppender(opts);
const log = SimpleNodeLogger.createRollingFileLogger(opts);
log.setLevel('debug');
export {log};