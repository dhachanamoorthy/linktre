import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { importProviders as pipesImportsProvider } from './pipes/import.providers';
import { UserModule } from './module/user/user.module';
import { SequelizeModule } from './sequelize/sequelize.module';
import sequelizeConfig from './sequelize/sequelize.config';
import { TreeModule } from './module/tree/tree.module';
@Module({
  imports: [
    SequelizeModule,
    ConfigModule.forRoot({
      load: [appConfig, sequelizeConfig],
      envFilePath: ['.env'],
    }),
    UserModule,
    TreeModule
  ],
  controllers: [AppController],
  providers: [AppService, ...pipesImportsProvider],
  exports: [...pipesImportsProvider],
})
export class AppModule {}
