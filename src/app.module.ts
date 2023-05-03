import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomePageController } from './controller/home-page.controller';
import { CommandeModule } from './modules/commande.module';
import { CommandeService } from './services/commande.service';
import { CommandeController } from './controller/commande.controller';


@Module({
  imports: [
     TypeOrmModule.forRoot(
       require('../config/ormconfig.json')
     ),
    CommandeModule,
  ],
  controllers: [AppController, HomePageController, CommandeController],
  providers: [AppService, CommandeService],
})
export class AppModule {}
