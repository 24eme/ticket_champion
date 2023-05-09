import { Controller, Get, Render, Res } from '@nestjs/common';
import { CommandeService } from 'src/services/commande.service';


@Controller('/')
export class HomePageController {
   constructor(private readonly commandeService: CommandeService) {}

  @Get()
  @Render('homePage')
  //the clients, plats, supplements tables are filled here
root() {
   this.commandeService.fillClientsTable();
   this.commandeService.fillPlatsTable();
   this.commandeService.fillSupplementsTable();
  }
}
