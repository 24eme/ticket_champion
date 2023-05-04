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
    //creer un nouveau objet 
    return { data : data }; 
  }
  

  @Get('supplements')
  @Render('supplementsPage')
  async supplement() {
    const data = await this.commandeService.getDataFromjson('config/restaurantsconfig.json');
    //creer un nouveau objet
    return {data: data};
  }


  @Get('commandes')
  @Render('commandesPage') 
  @Post()
  createCommande(@Body() createCommandeDto: CreateCommandeDto) {
    this.commandeService.createCommande(createCommandeDto);
  }

  fillTablePlats() {
    console.log("Hello Charlène");
    this.commandeService.fillPlatsTable();
  }

  //fill client table
 /* @Get('seed')
  async seedClients() {
    await this.commandeService.seedClients();
    return { message: 'Clients seeded successfully' };
  }*/



  @Get()
  getCommandes() {
    return this.commandeService.getCommandes();
  }


  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommandeDto: UpdateCommandeDto) {
    return this.commandeService.update(+id, updateCommandeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandeService.remove(+id);
  }*/
}
