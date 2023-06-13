  import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, Redirect, Req } from '@nestjs/common';
  import { CommandeService } from '../services/commande.service';
  import { CreateCommandeDto } from '../commande/dto/create-commande.dto';
  import { CreatePlatDto } from 'src/commande/dto/create-plat-dto';
  import { CreateSupplementtDto } from 'src/commande/dto/create-supplement-dto';


  @Controller('/')
  export class CommandeController {


    private commandeDto = new CreateCommandeDto();
    private prefix : string;

    constructor(private readonly commandeService: CommandeService) {
	    this.commandeDto.plats = [];
      this.commandeDto.supplements = [];
      this.prefix = "";

    }

    @Get('selectionClientPage')
    @Render('selectionClientPage')
    async selectionClientPage() {

      this.prefix =  (await this.commandeService.getDataFromjson('config/config.json')).data.globalPrefix; 
      console.log("le prefix est : ", this.prefix);
      return {prefix : this.prefix}
  }

    @Post('/selectionClientPage')
    async redirect(@Res() res, @Req() req: Request) {
      const key = Object.keys(req.body);
      const entreprise = key[0].slice(0, -2);
      this.commandeDto.entreprise = entreprise;
      this.commandeDto.nom_employee = "";
      this.commandeDto.plats = [];
      this.commandeDto.supplements = [];
      this.commandeDto.montant_Commande = 0;
      const prefix = (await this.commandeService.getDataFromjson('config/config.json')).data.globalPrefix; 
      return {resp : res.redirect(`${prefix}/clients`), prefix : prefix};
    }

    @Get('clients')
    @Render('clientsPage')
    async employes() {
      const listEmployee = await this.commandeService.getClientByEntreprise(this.commandeDto.entreprise);
      var currentDate = new Date();
      var todayDate = currentDate.toISOString().split('T')[0];
      let e = '';
      for ( e in listEmployee)
      {
        let CommandeClient = await this.commandeService.getDateCommandPerName(listEmployee[e].nom);
        if (CommandeClient.length > 0) {
          let dateCommandeClient = CommandeClient[CommandeClient.length - 1].commande_date_commande.toISOString().split('T')[0];
          if (listEmployee[e].commande_faite == 1 && dateCommandeClient.localeCompare(todayDate) != 0) {
            listEmployee[e].commande_faite = await this.commandeService.modifyCommandeFaite(listEmployee[e].nom);
          }
        }
      }

      return {prefix : this.prefix, listEmployee : listEmployee, entreprise : this.commandeDto.entreprise};
    }

    @Get('/tickets')
    @Render('ticketsClient')
    async handlerTickets(){
      const listEmployee = await this.commandeService.getClientByEntreprise(this.commandeDto.entreprise);
      return {prefix : this.prefix, listEmployee : listEmployee}

    }

    @Post('/clients')
    async handlePostRequestClient(@Res() res, @Req() req: Request) {
      this.commandeDto.nom_employee = Object.values(req.body)[0];
      this.commandeDto.id_client = Number(Object.keys(req.body)[0]);
      this.commandeDto.plats = [];
      this.commandeDto.supplements = [];
      this.commandeDto.montant_Commande = 0;
      const prefix = (await this.commandeService.getDataFromjson('config/config.json')).data.globalPrefix; 
      return {resp : res.redirect(`${prefix}/plats`), prefix : prefix};
    }

    @Get('plats')
    @Render('platsPage')
    async plat() {
      const data = await this.commandeService.getDataFromjson('config/restaurantsconfig.json');
      const employee = this.commandeDto.nom_employee;

      return {prefix : this.prefix, data : data, employee, plats : this.commandeDto.plats, supplements : this.commandeDto.supplements, montant : this.commandeDto.montant_Commande };

    }

    @Post('/plats')
    async handlePostRequestPlat(@Res() res, @Req() req: Request) {
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
            this.commandeDto.montant_Commande += prix*listNombrePlat[e];
            let thisSupp = this.commandeDto.supplements.find(lesupp => lesupp.nom_supplement === nomPlat);
            thisSupp.quantite = Number(thisSupp.quantite) +  Number(listNombrePlat[e]);

            if (thisSupp.quantite == 0){
              let index: number = this.commandeDto.supplements.indexOf(thisSupp);
              if (index !== -1) {
                this.commandeDto.supplements.splice(index, 1);
              }
            }
          }
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
    return res.redirect(`${this.prefix}/supplements`);
 	}

  @Get('supplements')
  @Render('supplementsPage')
  async supp() {
    const data = await this.commandeService.getDataFromjson('config/restaurantsconfig.json');
    return {prefix : this.prefix, data: data, plats : this.commandeDto.plats, supplements : this.commandeDto.supplements, montant : this.commandeDto.montant_Commande};


  }

  @Post('/supplements')
  @Redirect()
  async handlePostRequestSupplement(@Req() req: Request) {
    let listPlat = Object.keys(req.body);
    let listNombrePlat = Object.values(req.body);
    let destination = '';
    let x = '';
    for (x in listPlat) {
      if (listPlat[x] === 'pre') {
        destination = listPlat[x];
      }
      else if (listPlat[x]  === 'next') {
        destination = listPlat[x];
      }
    }
    if (
      listPlat[listPlat.length - 1] === 'pre' || listPlat[listPlat.length - 1] === 'next') {
      listPlat.pop();
      listNombrePlat.pop();
    } else if (listPlat[0] === 'pre' || listPlat[0] === 'next')
    {
      listPlat.shift();
      listNombrePlat.shift();
    }
    let e = "";
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

      let nomPlat = listPlat[e];

      if (listTotalPlats.find(plat => plat === nomPlat)){
        let prixObjet = await this.commandeService.getPrixPlat(nomPlat);
        let prix = prixObjet[0].prix_plat;
        if(listNombrePlat[e] <0){
          this.commandeDto.montant_Commande += prix*listNombrePlat[e];
          let thisPlat = this.commandeDto.plats.find(leplat => leplat.nom_plat === nomPlat);
          thisPlat.quantite = Number(thisPlat.quantite) +  Number(listNombrePlat[e]);

          if (thisPlat.quantite == 0){
            let index: number = this.commandeDto.plats.indexOf(thisPlat);
            if (index !== -1) {
              this.commandeDto.plats.splice(index, 1);
            }
          }
        }
      }

      if (listTotalSupps.find(supp => supp === nomPlat)){
        let prixObjet = await this.commandeService.getPrixSupplement(nomPlat);
        let prix = prixObjet[0].prix_supplement;

        if(listNombrePlat[e] <0){

          let thisSupp = this.commandeDto.supplements.find(lesupp => lesupp.nom_supplement === nomPlat);

          thisSupp.quantite = Number(thisSupp.quantite) +  Number(listNombrePlat[e]);

          if (thisSupp.quantite == 0){
            let index: number = this.commandeDto.supplements.indexOf(thisSupp);
            if (index !== -1) {
              this.commandeDto.supplements.splice(index, 1);
            }

          }
          this.commandeDto.montant_Commande += prix*listNombrePlat[e];
        }

      if(listNombrePlat[e]>0){
        if(this.commandeDto.supplements.find(lesupp => lesupp.nom_supplement === nomPlat) == undefined  ){
          let supplement = new CreateSupplementtDto();
          supplement.nom_supplement = nomPlat;
          supplement.quantite = listNombrePlat[e];
          supplement.prix = prix;
          this.commandeDto.supplements.push(supplement);

        }else {this.commandeDto.supplements.find(lesupp => lesupp.nom_supplement === nomPlat).quantite = Number(this.commandeDto.supplements.find(leplat => leplat.nom_supplement === nomPlat).quantite) + Number(listNombrePlat[e]);}

        this.commandeDto.montant_Commande += prix*listNombrePlat[e];
      }
    }
  }

    if (destination === "next") {

      return { url: `${this.prefix}/heureLivraison` };
    } else if (destination === "pre") {
      return { url: `${this.prefix}/plats`};
    }
  }

  @Get('confirmation')
  @Render('confirmationPage')
  createCommande() {
    this.commandeService.create(this.commandeDto, this.commandeDto.plats, this.commandeDto.supplements)

    return{prefix : this.prefix}

  }

  @Get('heureLivraison')
  @Render('heureLivraisonClient')
  async heureLivraison() {

    return {prefix : this.prefix, command: this.commandeDto };

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

