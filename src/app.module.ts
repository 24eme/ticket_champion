import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatsPageModule } from './platsPage/platsPage.module';
import { PlatsPageController } from './platsPage/platsPage.controller';
import { HomePageController } from './home-page/home-page.controller';


@Module({
  imports: [
     TypeOrmModule.forRoot(
       require('../ormconfig.json')
     ),
    PlatsPageModule,
  ],
  controllers: [AppController, PlatsPageController, HomePageController],
  providers: [AppService],
})
export class AppModule {}
