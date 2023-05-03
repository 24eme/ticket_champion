import { Module } from '@nestjs/common';
import { CommandeService } from '../services/commande.service';
import { CommandeController } from '../controller/commande.controller';

@Module({
  controllers: [CommandeController],
  providers: [CommandeService]
})
export class CommandeModule {}
