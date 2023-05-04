import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res } from '@nestjs/common';
import { CommandeService } from '../services/commande.service';
import { CreateCommandeDto } from '../commande/dto/create-commande.dto';
import { UpdateCommandeDto } from '../commande/dto/update-commande.dto';
import { join } from 'path';

@Controller('/')
export class CommandeController {

  private readonly commandeDto = new CreateCommandeDto();

  constructor(private readonly commandeService: CommandeService) {
    this.commandeDto.nom_plat = [];
    this.commandeDto.nom_Supplement = [];
    
  }



@Get('clients1')
@Render('clientsPage')
async employes() {
  
  const data = await this.commandeService.getClientsFromJson();
  // creer un nouvel objet
  return {data: data};
}

@Post('/')
handlePostRequest(@Body('texteSurBouton') texteSurBouton: string) {
  this.commandeDto.nom_Client = `${texteSurBouton}`;
  // traitez les données soumises ici
}

@Post('/clients1')
handlePostRequest2(@Body('buttonText') buttonText: string) {
  this.commandeDto.nom_employee = `${buttonText}`;
  
}

  @Get('plats')
  @Render('platsPage')
  async plat() {
    const data = await this.commandeService.getPlatFromjson();
    const employee = this.commandeDto.nom_employee;
    return { data : data, employee  };   
  }


  @Post('/plats')
handlePostRequest3(@Body('buttonText') buttonText: string) {
  this.commandeDto.nom_plat.push(buttonText);
  
}

  @Get('supplements')
  @Render('supplementsPage')
  async supp() {
    const data = await this.commandeService.getSupplementFromJson();

    return {data: data};
  }

  @Post('/supplements')
  handlePostRequest4(@Body('buttonText') buttonText: string) {
    this.commandeDto.nom_Supplement.push(buttonText); 
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
