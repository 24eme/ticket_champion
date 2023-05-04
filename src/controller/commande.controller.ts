import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res } from '@nestjs/common';
import { CommandeService } from '../services/commande.service';
import { CreateCommandeDto } from '../commande/dto/createCommande.dto';
import { UpdateCommandeDto } from '../commande/dto/updateCommande.dto';

@Controller('/')
export class CommandeController {
  constructor(private commandeService: CommandeService) {}

  @Get('plats')
  @Render('platsPage')
  async plat() {
    const data = await this.commandeService.getPlatFromjson();
    //creer un nouveau objet  
    return { data : data }; 
  }

  @Get('supplements')
  @Render('supplementsPage')
  async supp() {
    const data = await this.commandeService.getSupplementFromJson();
    //creer un nouveau objet
    return {data: data};
  }
  //fill client table
 /* @Get('seed')
  async seedClients() {
    await this.commandeService.seedClients();
    return { message: 'Clients seeded successfully' };
  }*/

 /* @Post()
  createCommande(@Body() createCommandeDto: CreateCommandeDto) {
    return this.commandeService.createCommande(createCommandeDto);
  }

  @Get()
  getCommandes() {
    return this.commandeService.getCommandes();
  }


  @Get(':id')
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
