import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';

@Module({
    providers: [
        {
            provide: UtilsService,
            useClass: UtilsService,
        },
    ],
    exports: [UtilsService],
})
export class UtilsModule { }
