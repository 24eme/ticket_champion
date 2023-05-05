import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res } from '@nestjs/common';
import { CommandeService } from '../services/commande.service';
import { CreateCommandeDto } from '../commande/dto/CreateCommande.dto';
import { UpdateCommandeDto } from '../commande/dto/updateCommande.dto';

@Controller('/')
export class CommandeController {
  constructor(private commandeService: CommandeService) {}

  @Get('plats')
  @Render('platsPage')
  async plat() {
    const data = await this.commandeService.getDataFromjson('config/restaurantsconfig.json');
    return { data : data }; 
  }
  

  @Get('supplements')
  @Render('supplementsPage')
  async supplement() {
    const data = await this.commandeService.getDataFromjson('config/restaurantsconfig.json');
    return {data: data};
  }


  @Get('commandes')
  @Render('commandesPage') 
  @Post()
  createCommande(@Body() createCommandeDto: CreateCommandeDto) {
    this.commandeService.createCommande(createCommandeDto);
  }

  @Get()
  getCommandes() {
    return this.commandeService.getCommandes();
  }
}
