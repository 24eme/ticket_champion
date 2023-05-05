import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomePageController } from './controller/homePage.controller';
import { CommandeModule } from './modules/commande.module';
import { CommandeService } from './services/commande.service';
import { CommandeController } from './controller/commande.controller';
import { RestaurantController } from './controller/restaurant.controller';
import { Commande } from './typeorm/entities/Commande';


@Module({
  imports: [
     TypeOrmModule.forRoot(
       require('../config/ormconfig.json')
     ),TypeOrmModule.forFeature([Commande]),
    CommandeModule,
  ],
  controllers: [AppController, HomePageController, CommandeController, RestaurantController],
  providers: [AppService, CommandeService],
})
export class AppModule {}
