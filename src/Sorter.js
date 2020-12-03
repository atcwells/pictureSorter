import * as path from 'path';
import shell from "shelljs";
import exif from "exif";
import {log} from "./Logger.js";

const {pwd, mkdir, cp, mv, ls} = shell;
shell.config.silent = false;
const {basename} = path.posix;
const {ExifImage} = exif;

export class Sorter {
    sourceFolder;
    movedFilesFolder;
    destinationFolder;
    database;

    constructor({source_folder, destination_folder}, database) {
        this.database = database;
        this.sourceFolder = `${pwd()}${source_folder}`;
        this.movedFilesFolder = `${pwd()}${source_folder}/moved_files`;
        this.destinationFolder = `${pwd()}${destination_folder}`;
        mkdir('-p', this.movedFilesFolder);
    }

    async sortFile(filePath) {
        return new Promise(async (resolve, reject) => {
            if (await this.database.isFileDiscovered(filePath)) {
                log.debug(`File at ${filePath} already discovered, not rediscovering`);
                return resolve({
                    ... await this.database.getDiscoveredFile(filePath)
                });
            }

            this._getExifModifiedDate(filePath, async dateInfo => {
                const {year, month} = dateInfo;
                if (year && month && dateInfo) {
                    const destFilePath = `${this.destinationFolder}/${year}/${month}`;
                    mkdir('-p', `${this.destinationFolder}/${year}/${month}`);
                    await this.database.discoverFile(filePath, {
                        filePath,
                        destFilePath,
                        ...dateInfo
                    });
                    return resolve({
                        ... await this.database.getDiscoveredFile(filePath)
                    });
                } else {
                    return reject({
                        error: 'Unable to parse EXIF data for image'
                    });
                }
            });
        })
    }

    moveFile({filePath, destFilePath}) {
        const fileAlreadyExists = ls(`${destFilePath}/${basename(filePath)}`).length !== 0;
        if (fileAlreadyExists) {
            log.debug(`File ${basename(filePath)} at ${destFilePath} already exists, not copying...`);
            return
        }

        log.debug(`Proceeding to copy file at ${filePath} to destination ${destFilePath}`);
        cp(filePath, `${destFilePath}/${basename(filePath)}`);
        log.debug(`Cleaning source file to backup folder`);
        mv(filePath, `${this.movedFilesFolder}/${basename(filePath)}`);
    }

    _getExifModifiedDate(fileLocation, callback) {
        try {
            new ExifImage({image: fileLocation}, (error, exifData) => {
                if (error) {
                    log.error(error.message);
                    callback(null);
                }

                log.debug(`Processing file at: ${fileLocation}`);
                callback(this._parseExifDate(fileLocation, exifData.image.ModifyDate));
            });
        } catch (error) {
            log.error(`${error.message} for file ${fileLocation}`);
            callback(null);
        }
    }

    _parseExifDate(fileLocation, exifDate) {
        const [year, month, day] = exifDate.split(' ')[0].split(':');
        const [hour, minute, seconds] = exifDate.split(' ')[1].split(':');
        log.debug(`Found date for file at: ${fileLocation}:
            ${JSON.stringify({
            year,
            month,
            day,
            hour,
            minute,
            seconds
        }, null, 4)}`);
        return {
            year,
            month,
            day,
            hour,
            minute,
            seconds
        };
    }
};