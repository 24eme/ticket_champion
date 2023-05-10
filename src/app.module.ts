import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomePageController } from './controller/homePage.controller';
//import { CommandeModule } from './modules/commande.module';
import { CommandeService } from './services/commande.service';
import { CommandeController } from './controller/commande.controller';
import { RestaurantController } from './controller/restaurant.controller';
import { Commande } from './typeorm/entities/Commande';
import { Client } from './typeorm/entities/Client';
import { Supplement } from './typeorm/entities/Supplement';
import { Plat } from './typeorm/entities/Plat';
import { CommandeSupplement } from './typeorm/entities/CommandeSupplement';
import { CommandePlat } from './typeorm/entities/CommandePlat';


@Module({
  imports: [
     TypeOrmModule.forRoot(
       require('../config/ormconfig.json')
     ),TypeOrmModule.forFeature([Commande,Client,Supplement,Plat, CommandePlat, CommandeSupplement]),
  ],
  controllers: [AppController, HomePageController, CommandeController, RestaurantController],
  providers: [AppService, CommandeService],
})
export class AppModule {}
