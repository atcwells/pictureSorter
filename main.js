import {Sorter} from "./src/server/Sorter.js"
import DatabaseSetup from "./src/server/database/Database.js";
import {log} from "./src/server/Logger.js";

import options from "./package.json"
import cron from "node-cron"
import shell from "shelljs";
import Server from "./src/server/Server.js";

(async () => {

    const settings = {...options.settings};
    Object.keys(process.env).forEach(envVar => {
        if (settings.hasOwnProperty(envVar.toLowerCase()))
            settings[envVar.toLowerCase()] = process.env[envVar];
    });
    log.setLevel(settings.log_level || 'debug');
    log.info(settings);

    const {schedule} = cron;
    const {ls} = shell;
    const {cron_schedule} = options.settings;

    const Database = await DatabaseSetup();
    const sorter = new Sorter(options.settings, Database);
    const server = await Server(Database);

    let sort = ({doMove}) => {
        log.debug(`Beginning new sort operation at ${sorter.sourceFolder}`);
        ls(`${sorter.sourceFolder}/*.jp*g`).forEach(async file => {
            try {
                let sortDetails = await sorter.sortFile(file);
                if (sortDetails)
                    log.debug(`Parsed file successfully, planned move: \n${sortDetails}`);

                if (doMove)
                    sorter.moveFile(sortDetails);
                else
                    log.debug(`Not moving file as mode=${settings.mode}`);
            } catch (error) {
                log.error(error);
            }
        });
    };

    /*
    if (settings.mode === 'run') {
        sort({
            doMove: true
        })
    }

    if (settings.mode === 'repeat') {
        schedule(cron_schedule, () => {
            sort({
                doMove: true
            })
        });
    }*/

    if (settings.mode === 'test') {
        sort({
            doMove: false
        })
    }

})();