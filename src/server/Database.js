import setup from '../../models/index.js'; // new require for db object

let database = {
    files: {}
};

let db = null;

export class Database {
    constructor() {

    }

    async isFileDiscovered(fileLocation) {
        const files = await db.File.findOne({
            name: fileLocation
        });
        return files !== null && files.length !== 0;
    }

    async getDiscoveredFile(fileLocation) {
        const files = await db.File.findOne({
            name: fileLocation
        });
        if (files)
            return files[0];

        return null;
    }

    async discoverFile(fileLocation, discoveredData) {
        await db.File.create({
            name: fileLocation
        });
    }
}

export default async function () {
    try {
        db = await setup();
    } catch (e) {
        console.error(e)
    }

    return Database;
}