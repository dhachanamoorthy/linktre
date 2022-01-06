import { Sequelize } from 'sequelize-typescript';
import * as Umzug from 'umzug';
import * as path from 'path';
import { Config } from '../config';
import * as dotenv from 'dotenv';

dotenv.config();
const config = Config();

const sequelize = new Sequelize(config.uri, config.options);
const umzug = new Umzug({
  migrations: {
    path: path.join(__dirname, './scripts'),
    params: [sequelize.getQueryInterface()],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize,
  },
});

const command = process.argv[2] && process.argv[2] === 'down' ? 'down' : 'up';

(async () => {
  if (command === 'up') {
    await umzug.up();
  } else {
    await umzug.down();
  }
})();
