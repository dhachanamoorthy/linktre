import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import sequelizeConfig from './sequelize.config';

@Injectable()
export class SequelizeService {
  constructor(
    @Inject(sequelizeConfig.KEY)
    private readonly sConfig: ConfigType<typeof sequelizeConfig>,
  ) {}

  sequelizeConfig() {
    this.sConfig.options.logging = (sql, executionTimeInMillis, sequelize) => {
      const log = {
        sequelize: {
          sql,
          executionTimeInMillis,
        },
        comment: sequelize.comment,
      };
      console.log(log);
    };
    return this.sConfig;
  }
}
