import { Module } from '@nestjs/common';
import { PlatsPageController } from './platsPage.controller';

@Module({
  controllers: [PlatsPageController],
})
export class PlatsPageModule {}