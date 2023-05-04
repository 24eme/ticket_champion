import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from '../typeorm/entities/Commande';
import { CommandeService } from '../services/commande.service';
import { CommandeController } from '../controller/commande.controller';
import { Plat } from '../typeorm/entities/Plat';
import { Supplement } from '../typeorm/entities/Supplement';
import { Client } from '../typeorm/entities/Client';
import { CommandePlat } from '../typeorm/entities/CommandePlat';
import { CommandeSupplement } from '../typeorm/entities/CommandeSupplement';

@Module({
  imports : [TypeOrmModule.forFeature([Plat, Supplement, Client, Commande, CommandePlat, CommandeSupplement])],
  controllers: [CommandeController],
  providers: [CommandeService]
})
export class CommandeModule {}
