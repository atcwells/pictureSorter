'use strict';

import sequelize from 'sequelize'

const {Model} = sequelize;

class File extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                type: {
                    type: DataTypes.STRING
                }
            },
            {
                sequelize,
                underscored: true,
                tableName: 'file',
                modelName: 'File'
            })
    }
}

export default File;