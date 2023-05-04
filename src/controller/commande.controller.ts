import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res } from '@nestjs/common';
import { CommandeService } from '../services/commande.service';
import { CreateCommandeDto } from '../commande/dto/create-commande.dto';
import { UpdateCommandeDto } from '../commande/dto/update-commande.dto';
import { join } from 'path';

@Controller('/')
export class CommandeController {

  private readonly commandeDto = new CreateCommandeDto();

  constructor(private readonly commandeService: CommandeService) {
    
  }



@Get('clients1')
@Render('clientsPage')
async employes() {
  
  const data = await this.commandeService.getClientsFromJson();
  this.commandeDto.nom_Client = '24EME';
  // creer un nouvel objet
  return {data: data, commandeDto :CreateCommandeDto };
}


@Post('/clients1')
handlePostRequest(@Body('texteSurBouton') texteSurBouton: string) {
  console.log(`Le texte sur le bouton était: ${texteSurBouton}`);
  // traitez les données soumises ici
}

  @Get('plats')
  @Render('platsPage')
  async plat() {
    const data = await this.commandeService.getPlatFromjson();
    return { data : data };   
  }


 

  @Get('supplements')
  @Render('supplementsPage')
  async supp() {
    const data = await this.commandeService.getSupplementFromJson();
    
    // if (typeof document !== 'undefined') {


    //   this.commandeDto.nom_plat[0] =  await this.commandeService.getInfo();
    //   //creer un nouveau objet
    //   console.log(this.commandeDto.nom_Client);
    //   console.log(this.commandeDto.nom_plat[0]);}
    //creer un nouveau objet
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
