import { Module } from '@nestjs/common';
import { supplementsPageController } from './supplementsPage.controller';

@Module({
    controllers: [supplementsPageController],
})
export class supplementsPageModule {}