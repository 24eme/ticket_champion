  import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, Redirect, Req } from '@nestjs/common';
  import { CommandeService } from '../services/commande.service';
  import { CreateCommandeDto } from '../commande/dto/create-commande.dto';
  import { CreatePlatDto } from 'src/commande/dto/create-plat-dto';
  import { CreateSupplementtDto } from 'src/commande/dto/create-supplement-dto';

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
      const key = Object.keys(req.body);
      const entreprise = key[0].slice(0, -2); 
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
      return { data : data, employee, plats : this.commandeDto.plats, supplements : this.commandeDto.supplements, montant : this.commandeDto.montant_Commande };
    }

    @Post('/plats')
    @Redirect('/supplements')
    async handlePostRequestPlat(@Req() req: Request) {
      let listPlat = Object.keys(req.body);
      let listNombrePlat = Object.values(req.body);
      listPlat.pop();
      listNombrePlat.pop();
      let e = ""
      let plats = await this.commandeService.getAllPlat();
      let listTotalPlats: string[] = [];

      let supplemets = await this.commandeService.getAllSupplement();
      let listTotalSupps: string[] = [];

      for (const plat of plats) {
        listTotalPlats.push(plat.nom_plat);
      }
      for (const supp of supplemets) {
        listTotalSupps.push(supp.nom_supplement);
      }

      for ( e in listNombrePlat){

        let nomPlat = listPlat[e].split(',')[0];
        let prix = Number(listPlat[e].split(',')[1]);

        if (listTotalSupps.find(supp => supp === nomPlat)){
          if(listNombrePlat[e] <0){
            let thisSupp = this.commandeDto.supplements.find(lesupp => lesupp.nom_supplement === nomPlat);
            thisSupp.quantite = Number(thisSupp.quantite) +  Number(listNombrePlat[e]);

            if (thisSupp.quantite == 0){
              let index: number = this.commandeDto.supplements.indexOf(thisSupp);
              if (index !== -1) {
                this.commandeDto.supplements.splice(index, 1);
              }  
            }
          }
          this.commandeDto.montant_Commande += prix*listNombrePlat[e];
        }
        
        if (listTotalPlats.find(plat => plat === nomPlat)){

          if(listNombrePlat[e] <0){

            let thisPlat = this.commandeDto.plats.find(leplat => leplat.nom_plat === nomPlat);

            thisPlat.quantite = Number(thisPlat.quantite) +  Number(listNombrePlat[e]);

            if (thisPlat.quantite == 0){
              let index: number = this.commandeDto.plats.indexOf(thisPlat);
              if (index !== -1) {
                this.commandeDto.plats.splice(index, 1);
              }
              
            }
            this.commandeDto.montant_Commande += prix*listNombrePlat[e];
          }

        if(listNombrePlat[e]>0){
          if(this.commandeDto.plats.find(leplat => leplat.nom_plat === nomPlat) == undefined  ){
            let plat = new CreatePlatDto();
            plat.nom_plat = nomPlat;
            plat.quantite = listNombrePlat[e];
            plat.prix = prix;
            this.commandeDto.plats.push(plat);
    
          }else {this.commandeDto.plats.find(leplat => leplat.nom_plat === nomPlat).quantite = Number(this.commandeDto.plats.find(leplat => leplat.nom_plat === nomPlat).quantite) + Number(listNombrePlat[e]);}
          
          this.commandeDto.montant_Commande += prix*listNombrePlat[e];
        }
      }
    }
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
      supplement.prix = Number(prix);
      supplement.nom_supplement = buttonText;
      supplement.quantite = 1;
      this.commandeDto.supplements.push(supplement);

    }else {this.commandeDto.supplements.find(suplement => suplement.nom_supplement === buttonText).quantite ++;}
    this.commandeDto.montant_Commande += Number(prix);

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

