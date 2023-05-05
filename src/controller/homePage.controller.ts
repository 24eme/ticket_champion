import { Controller, Get, Render, Res } from '@nestjs/common';
import { CommandeService } from 'src/services/commande.service';


@Controller('/')
export class HomePageController {
    constructor(private readonly commandeService: CommandeService) {}

  @Get()
  @Render('homePage')
  //the clients table is filled here
  async root() {
    await this.commandeService.fillClientsTable();
  }
}
