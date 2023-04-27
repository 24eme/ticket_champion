import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatsPageModule } from './platsPage/platsPage.module';
import { PlatsPageController } from './platsPage/platsPage.controller';
import { supplementsController } from './supplements/supplements.controller';
import { SupplementsService } from './supplements/supplements.service';
import { supplementsModule } from './supplements/supplements.module';
import { HomePageController } from './home-page/home-page.controller';


@Module({
  imports: [
     TypeOrmModule.forRoot(
       require('../ormconfig.json')
     ),
    PlatsPageModule,
    supplementsModule,
  ],
  controllers: [AppController, PlatsPageController, HomePageController, supplementsController],
  providers: [AppService],
})
export class AppModule {}
