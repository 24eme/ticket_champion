import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpAdapterHost } from '@nestjs/core';
import { HomePageController } from './home-page/home-page.controller';



@Module({
  //imports: [
    //TypeOrmModule.forRoot(
      //require('../ormconfig.json')
    //),
  //],
  imports: [ ],
  controllers: [AppController, HomePageController],
  providers: [AppService],
})
export class AppModule {}
