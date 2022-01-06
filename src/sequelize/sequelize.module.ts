import { Module } from '@nestjs/common';
import { SequelizeProvider } from './sequelize.provider';
import { SequelizeService } from './sequelize.service';
import { ConfigModule } from '@nestjs/config';
import sequelizeConfig from './sequelize.config';

@Module({
  imports: [ConfigModule, ConfigModule.forFeature(sequelizeConfig)],
  providers: [
    {
      provide: SequelizeService,
      useClass: SequelizeService,
    },
    ...SequelizeProvider,
  ],
  exports: [...SequelizeProvider],
})
export class SequelizeModule {}
