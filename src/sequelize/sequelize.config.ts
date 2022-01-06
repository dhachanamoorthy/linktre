import { registerAs } from '@nestjs/config';
import { Config } from './config';

export default registerAs('sequelize', async () => {
  return Config();
});
