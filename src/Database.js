const database = {
    files: {}
};

export class Database {
    constructor() {

    }

    async isFileDiscovered(fileLocation) {
        return database.files.hasOwnProperty(fileLocation);
    }

    async getDiscoveredFile(fileLocation) {
        return database.files[fileLocation];
    }

    async discoverFile(fileLocation, discoveredData) {
        database.files[fileLocation] = discoveredData;
    }
}