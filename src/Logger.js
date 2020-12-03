import SimpleNodeLogger from 'simple-node-logger';
import shell from 'shelljs';

const {pwd} = shell;

const log = SimpleNodeLogger.createSimpleLogger({
    logFilePath: `${pwd()}/log.log`,
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
});
log.setLevel('debug');
export {log};