import { Sequelize } from "sequelize-typescript";
import { SequelizeService } from "./sequelize.service";
import * as userModels from '../module/user/models';
import sequelizeConfig from "./sequelize.config";
import { Logger } from "@nestjs/common";

export const SequelizeProvider = [
    {
        provide: 'SEQUELIZE',
        useFactory:async (sequelizeService:SequelizeService) => {
            const config = sequelizeService.sequelizeConfig();
            const sequelize = new Sequelize(config.uri,config.options);
            const allModels = [];
            for (const value in userModels){
                allModels.push(userModels[value]);
            }
            sequelize.addModels([...allModels]);
            if(process.env.ENV === 'e2e'){
                await sequelize.sync();
            }
            return sequelize;
        },
        inject: [SequelizeService],
    }
]
