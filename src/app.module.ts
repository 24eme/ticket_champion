import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatsPageModule } from './platsPage/platsPage.module';
import { PlatsPageController } from './platsPage/platsPage.controller';
import { PlatsPageService } from './platsPage/platsPage.service';
import { supplementsController } from './supplementsPage/supplementsPage.controller';
import { supplementsModule } from './supplementsPage/supplementsPage.module';
import { SupplementsService } from './supplementsPage/supplementsPage.service';
import { HomePageController } from './homePage/home-page.controller';


@Module({
  imports: [
     TypeOrmModule.forRoot(
       require('../config/ormconfig.json')
     ),
    PlatsPageModule,
    supplementsModule,
  ],
  controllers: [AppController, HomePageController, PlatsPageController, supplementsController],
  providers: [AppService, PlatsPageService, SupplementsService],
})
export class AppModule {}
