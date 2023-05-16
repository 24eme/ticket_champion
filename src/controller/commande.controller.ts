import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, Redirect, Req } from '@nestjs/common';
import { CommandeService } from '../services/commande.service';
import { CreateCommandeDto } from '../commande/dto/create-commande.dto';
import { UpdateCommandeDto } from '../commande/dto/update-commande.dto';
import { CreatePlatDto } from 'src/commande/dto/create-plat-dto';
import { CreateSupplementtDto } from 'src/commande/dto/create-supplement-dto';
import { Supplement } from 'src/typeorm/entities/Supplement';

@Controller('/')
export class CommandeController {

  private commandeDto = new CreateCommandeDto();

  constructor(private readonly commandeService: CommandeService) {
    this.commandeDto.plats = [];
    this.commandeDto.supplements = [];

  }

  @Get('selectionClientPage')
  @Render('selectionClientPage')
  async selectionClientPage() {}

  @Post('/selectionClientPage')
  @Redirect('/clients')
  async handlePostRequest(@Req() req: Request) {
    console.log(req.body);
    const key = Object.keys(req.body);
    const entreprise = key[0].slice(0, -2); 
    console.log(entreprise);
    this.commandeDto.entreprise = entreprise;
    this.commandeDto.nom_employee = "";
    this.commandeDto.plats = [];
    this.commandeDto.supplements = [];
    this.commandeDto.montant_Commande = 0;

  }

  @Get('clients')
  @Render('clientsPage')
  async employes() {
    const listEmployee = await this.commandeService.getClientByEntreprise(this.commandeDto.entreprise);
    return {listEmployee : listEmployee, entreprise : this.commandeDto.entreprise};
  }

  @Post('/clients')
  @Redirect('/plats')
  async handlePostRequestClient(@Req() req: Request) {
    this.commandeDto.nom_employee = Object.values(req.body)[0];
    this.commandeDto.id_client = Number(Object.keys(req.body)[0]);
    this.commandeDto.plats = [];
    this.commandeDto.supplements = [];
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
  handlePostRequestPlat(@Body('buttonText') buttonText: string, @Body('prix') prix: string) {

    if(this.commandeDto.plats.find(plat => plat.nom_plat === buttonText) == undefined  ){
      let plat = new CreatePlatDto();
      plat.nom_plat = buttonText;
      plat.quantite = 1;
      plat.prix = Number(prix);
      this.commandeDto.plats.push(plat);
      
    }else {this.commandeDto.plats.find(plat => plat.nom_plat === buttonText).quantite ++;}
    this.commandeDto.montant_Commande += Number(prix);

  }

  //pour supprimer un plat
  @Delete('/plats/:plat')
  handleDeleteRequestPlat(@Param('plat') plat: string) {
    const platIndex = this.commandeDto.plats.findIndex((p) => p.nom_plat === plat);
    if (platIndex !== -1) {
      const plat = this.commandeDto.plats[platIndex];
      const prixTotal = plat.prix * plat.quantite;
      this.commandeDto.plats.splice(platIndex, 1);
      this.commandeDto.montant_Commande -= prixTotal;
    }
  }

  @Get('supplements')
  @Render('supplementsPage')
  async supp() {
    const data = await this.commandeService.getDataFromjson('config/restaurantsconfig.json');
    return {data: data, plats : this.commandeDto.plats, montant : this.commandeDto.montant_Commande};

  }

  @Post('/supplements')
  handlePostRequestSupplement(@Body('buttonText') buttonText: string, @Body('prix') prix: string) {
    if(this.commandeDto.supplements.find(supplement => supplement.nom_supplement === buttonText) == undefined  ){
      let supplement = new CreateSupplementtDto();
      supplement.nom_supplement = buttonText;
      supplement.quantite = 1;
      this.commandeDto.supplements.push(supplement);

    }else {this.commandeDto.supplements.find(suplement => suplement.nom_supplement === buttonText).quantite ++;}
    this.commandeDto.montant_Commande += Number(prix);

    console.log(this.commandeDto.id_client);
    console.log(this.commandeDto.montant_Commande);
    console.log(this.commandeDto.nom_employee);
    console.log(this.commandeDto.plats);
    console.log(this.commandeDto.supplements);

  }

  @Get('confirmation')
  @Render('confirmationPage')
  createCommande() {
    this.commandeService.create(this.commandeDto, this.commandeDto.plats, this.commandeDto.supplements)
  }

  @Get('heureLivraison')
  @Render('heureLivraisonClient')
  async heureLivraison() {
    return { command: this.commandeDto };
  }

  @Post('/heureLivraison')
  handlePostRequestLivraison(@Body('buttonText') buttonText: string) {
    this.commandeDto.date_livraison = buttonText;
  }

  @Post()
  create(@Body() createCommandeDto: CreateCommandeDto) {
    //return this.commandeService.create(createCommandeDto);
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
