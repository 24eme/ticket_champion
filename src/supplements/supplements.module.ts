import { Module } from '@nestjs/common';
import { supplementsController } from './supplements.controller';

@Module({
    controllers: [supplementsController],
})
export class supplementsModule {}