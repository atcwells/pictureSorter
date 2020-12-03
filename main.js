import {Sorter} from "./src/Sorter.js"
import {Database} from "./src/Database.js";

import options from "./package.json"
import cron from "node-cron"
import shell from "shelljs";

const settings = {...options.settings};
Object.keys(process.env).forEach(envVar => {
    if (settings.hasOwnProperty(envVar.toLowerCase()))
        settings[envVar.toLowerCase()] = process.env[envVar];
})
console.log(settings);

const {schedule} = cron;
const {ls} = shell;
const {cron_schedule} = options.settings;

const database = new Database(options.settings);
const sorter = new Sorter(options.settings, database);


/* schedule(cron_schedule, () => {
    log.info(`Executing file discovery at ${sorter.sourceFolder}`);

    ls(`${sorter.sourceFolder}/*.jp*g`).forEach(async file => {
        try {
            let sortDetails = await sorter.sortFile(file);
            if (sortDetails)
                console.log(sortDetails);

            sorter.moveFile(sortDetails)
        } catch (error) {
            log.error(error);
        }
    });
}); */