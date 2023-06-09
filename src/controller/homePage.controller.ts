import { Controller, Get, Render, Res } from '@nestjs/common';
import { CommandeService } from 'src/services/commande.service';


@Controller('/')
export class HomePageController {
   private pathGlobal = process.env.GLOBAL_PREFIX || '';

   constructor(private readonly commandeService: CommandeService) {}

  @Get()
  @Render('homePage')
  //the clients, plats, supplements tables are filled here
   async root() {
      this.commandeService.fillClientsTable();
      this.commandeService.fillPlatsTable();
      this.commandeService.fillSupplementsTable();
      const prefix =  (await this.commandeService.getDataFromjson('config/config.json')).data.globalPrefix; 
      return {prefix : prefix} 
   }

}
