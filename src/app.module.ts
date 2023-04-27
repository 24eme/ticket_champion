import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatsPageModule } from './platsPage/platsPage.module';
import { PlatsPageController } from './platsPage/platsPage.controller';
import { supplementsPageController } from './supplements/supplementsPage.controller';
import { SupplementsPageService } from './supplements/supplementsPage.service';
import { supplementsPageModule } from './supplements/supplementsPage.module';
import { HomePageController } from './homePage/homePage.controller';


@Module({
  imports: [
     TypeOrmModule.forRoot(
       require('../ormconfig.json')
     ),
    PlatsPageModule,
    supplementsPageModule,
  ],
  controllers: [AppController, PlatsPageController, HomePageController, supplementsPageController],
  providers: [AppService],
})
export class AppModule {}
