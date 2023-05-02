import { Module } from '@nestjs/common';
import { supplementsController } from './supplementsPage.controller';
import { SupplementsService } from './supplementsPage.service';

@Module({
    controllers: [supplementsController],
    providers: [SupplementsService],
    exports: [SupplementsService],
})
export class supplementsModule {}