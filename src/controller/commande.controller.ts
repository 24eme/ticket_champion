import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res } from '@nestjs/common';
import { CommandeService } from '../services/commande.service';
import { CreateCommandeDto } from '../commande/dto/create-commande.dto';
import { UpdateCommandeDto } from '../commande/dto/update-commande.dto';

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
    
    const data = await this.commandeService.getDataFromjson('config/clientsConfig.json');
    return {data: data};
  }

  @Post('/')
  handlePostRequest(@Body('texteSurBouton') texteSurBouton: string) {
    this.commandeDto.nom_Client = `${texteSurBouton}`;
    this.commandeDto.nom_employee = "";
    this.commandeDto.nom_plat = [];
    this.commandeDto.nom_Supplement = [];
    this.commandeDto.montant_Commande = 0;

  }

  @Post('/clients1')
  handlePostRequest2(@Body('buttonText') buttonText: string, @Body('id') id: string) {
    this.commandeDto.nom_employee = `${buttonText}`;
    this.commandeDto.id_client = Number(id);
    this.commandeDto.nom_plat = [];
    this.commandeDto.nom_Supplement = [];
    this.commandeDto.montant_Commande = 0;
    
  }

  @Get('plats')
  @Render('platsPage')
  async plat() {
    const data = await this.commandeService.getDataFromjson('config/restaurantsconfig.json');
    const employee = this.commandeDto.nom_employee;
    return { data : data, employee  };   
  }

  @Post('/plats')
  handlePostRequest3(@Body('buttonText') buttonText: string, @Body('prix') prix: string) {
    this.commandeDto.nom_plat.push(buttonText);
    this.commandeDto.montant_Commande += Number(prix); 
  }

  @Get('supplements')
  @Render('supplementsPage')
  async supp() {
    const data = await this.commandeService.getDataFromjson('config/restaurantsconfig.json');
    return {data: data};
    
  }

  @Post('/supplements')
  handlePostRequest4(@Body('buttonText') buttonText: string, @Body('prix') prix: string) {
    this.commandeDto.nom_Supplement.push(buttonText); 
    this.commandeDto.montant_Commande += Number(prix);
  }

  @Get('commandes')
  @Render('commandesPage') 
  @Post()
  createCommande(@Body() createCommandeDto: CreateCommandeDto) {
    this.commandeService.createCommande(createCommandeDto);
  }

  @Get('heureLivraison')
  @Render('heureLivraisonClient')
  async heureLivraison() {}

  @Post('/heureLivraison')
  handlePostRequest5(@Body('buttonText') buttonText: string) {
    this.commandeDto.date_livraison = buttonText;
    console.log(this.commandeDto.nom_employee)
    console.log(this.commandeDto.id_client)
    console.log(this.commandeDto.nom_plat)
    console.log(this.commandeDto.nom_Supplement)
    console.log(this.commandeDto.montant_Commande)
    console.log(this.commandeDto.date_livraison)

  }

  @Post()
  create(@Body() createCommandeDto: CreateCommandeDto) {
    return this.commandeService.create(createCommandeDto);
  }

  @Get()
  findAll() {
    return this.commandeService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandeService.remove(+id);
  }
}
