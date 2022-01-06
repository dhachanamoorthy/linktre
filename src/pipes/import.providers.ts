import * as validator from 'class-validator';
import { VALIDATE } from "./importNames";

export const importProviders = [
    {
        provide:VALIDATE,
        useFactory: () =>validator.validate
    }
]