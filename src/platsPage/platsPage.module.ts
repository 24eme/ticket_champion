import { Module } from '@nestjs/common';
import { PlatsPageController } from './platsPage.controller';
import { PlatsPageService } from './platsPage.service';
@Module({
  controllers: [PlatsPageController],
  providers: [PlatsPageService],
  exports: [PlatsPageService],
})
export class PlatsPageModule {}