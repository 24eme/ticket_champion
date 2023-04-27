import { Module } from '@nestjs/common';
import { PlatsController } from './plats.controller';

@Module({
    controllers: [PlatsController],
  })
  export class PlatsModule {}