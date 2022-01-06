import { writeFileSync } from "fs";
import { join } from "path";

function generate(name : string){
    return `
    /* eslint-disable arrow-body-style */
    Sequelize = require('sequelize');
    module.exports = {
      up: async (queryInterface) => {
        try {
          return queryInterface.sequelize.transaction(
            { autocommit: false },
            async (transaction) => {
              await queryInterface.createTable(
                '${name.split("-")[1]}',
                {
                  id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                  },
                  created_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue:new Date().toUTCString()
                  },
                  updated_at: {
                    allowNull: true,
                    type: Sequelize.DATE,
                  },
                  deleted_at: {
                    allowNull: true,
                    type: Sequelize.DATE,
                  },
                },
                { transaction },
              );
            },
          );
        } catch (e) {
          throw new Error('${name} migration failed!');
        }
      },
      down: async (queryInterface) => {
        try {
          return queryInterface.sequelize.transaction(
            { autocommit: false },
            async (transaction) => {
              await queryInterface.dropTable('${name.split("-")[1]}', { transaction });
            },
          );
        } catch (e) {
          throw new Error('${name} migration failed!');
        }
      },
    };`;
}

if(process.argv.length < 3) {
    console.log('missing migration name!');
    process.exit(2);
}

const migrationName = `${new Date(0).toISOString().replace(/[^0-9]/g,"")}-${process.argv[2]}`;

const scriptName = `${migrationName}.js`;

writeFileSync(join(__dirname,'scripts',scriptName),generate(migrationName));

console.log(`created migration ${scriptName}`);