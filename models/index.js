'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configs from '../config/config.json';

const env = process.env.NODE_ENV || 'development';
const config = configs[env];
const {destroy_db} = config;
const db = {};

let setup = async () => {
    let sequelize;
    if (config.use_env_variable) {
        sequelize = new Sequelize(process.env[config.use_env_variable], config);
    } else {
        sequelize = new Sequelize(config.database, config.username, config.password, config);
    }

    let files = fs
        .readdirSync(`${path.resolve()}/models`)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
        });

    for (const file of files) {
        const {default: model} = await import(`${path.resolve()}/models/${file}`);
        db[model.name] = model.init(sequelize, Sequelize.DataTypes);
    }

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    await sequelize.sync({force: destroy_db});
    return db;
};

export default setup;
