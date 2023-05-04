import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res } from '@nestjs/common';
import { CommandeService } from '../services/commande.service';
import { CreateCommandeDto } from '../commande/dto/create-commande.dto';
import { UpdateCommandeDto } from '../commande/dto/update-commande.dto';
import { join } from 'path';

@Controller('/')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

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

  @Get('clients')
  @Render('clientsPage')
  async employes() {
    const data = await this.commandeService.getClientsFromJson();
    console.log(data);
    // creer un nouvel objet
    return {data: data};
  }

  @Post()
  create(@Body() createCommandeDto: CreateCommandeDto) {
    return this.commandeService.create(createCommandeDto);
  }

  @Get()
  findAll() {
    return this.commandeService.findAll();
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commandeService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommandeDto: UpdateCommandeDto) {
    return this.commandeService.update(+id, updateCommandeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandeService.remove(+id);
  }
}
