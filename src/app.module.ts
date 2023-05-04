//A RESOUDRE
/*Nest can't resolve dependencies of the CommandeService (?).
 Please make sure that the argument CommandeRepository at index [0] is available in the AppModule context.*/

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomePageController } from './controller/home-page.controller';
import { CommandeService } from './services/commande.service';
import { CommandeController } from './controller/commande.controller';
import { Commande } from './typeorm/entities/Commande';



@Module({
  imports: [
     TypeOrmModule.forRoot(
       require('../config/ormconfig.json')
     ),TypeOrmModule.forFeature([Commande]),
    // CommandeModule,
  ],
  controllers: [AppController, HomePageController, CommandeController],
  providers: [AppService, CommandeService],
})
export class AppModule {}
