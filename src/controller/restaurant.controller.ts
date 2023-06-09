import { Controller, Get, Render, Post, Req, Res, Redirect, Param } from '@nestjs/common';

import { CommandeService } from 'src/services/commande.service';

@Controller('/')
export class RestaurantController {

  private pathGlobal = process.env.GLOBAL_PREFIX || '';
  private nonEntreprise : string;
  private time : string;
  private prefix : string;

  constructor(private readonly commandeService: CommandeService) {}

  @Get('restaurant')
  @Render('restaurantPage')
  async restaurant() {
    const commande = await this.commandeService.getTousLesTicketsNonPrete();
    const commandePrete = await this.commandeService.getTousLesTicketsPrete();

    this.prefix =  (await this.commandeService.getDataFromjson('config/config.json')).data.globalPrefix; 
    return { commandes: commande, commandePrete : commandePrete, prefix : this.prefix };

  }

  @Get('/historique')
  @Render('restaurantHistoriquePage')
  async historique() {
    const totalCost = await this.commandeService.getTotalCostCommandesGroupedByEntreprise();
    const dataEntreprise = await this.commandeService.getClientsFromJson();
    console.log();
    const data = new Date();
    const month = data.toLocaleString('default', { month: 'long' });

    return {prefix : this.prefix, data: totalCost, dataEntreprise: dataEntreprise, month : month , nomEntreprise: this.nonEntreprise};

  }

  @Get('/facture/:entrepriseName/current_month')
    @Render('restaurantFacturePage')
    async factureRestaurant(@Param('entrepriseName') entrepriseName: string) {
    const currentDate = new Date().toISOString().split('T')[0].split('-')[1];
      const infoCommande = await this.commandeService.getAllPlatsByEntreprise(entrepriseName, currentDate);
      let listePlat = [];
      let listeQuantite = [];
      let listePrixTotale = [];
      for (let e in infoCommande) {
        if (listePlat.find( plat  => plat === infoCommande[e].nom_plat) == undefined){
          listePlat.push(infoCommande[e].nom_plat);
          listeQuantite.push(infoCommande[e].quantite);
          listePrixTotale.push(infoCommande[e].prix_plat*infoCommande[e].quantite);
        }
        else{
          let index: number = listePlat.indexOf(infoCommande[e].nom_plat);
              if (index !== -1) {
                listeQuantite[index] += infoCommande[e].quantite;
                listePrixTotale[index] += infoCommande[e].prix_plat*infoCommande[e].quantite;
              }
        }
      }

      let factureRestaurant = {}
      for(let e in listePlat){


        factureRestaurant[listePlat[e]] = {
          nom_plat : listePlat[e],
          quantite  : listeQuantite[e],
          prixTotale :  listePrixTotale[e]
        };
      }

      const infoCommandeSupplement = await this.commandeService.getAllSupplementsByEntreprise(entrepriseName, currentDate);
      let listeSupp = [];
      let listeQuantiteSupp = [];
      let listePrixTotaleSupp = [];
      for (let e in infoCommandeSupplement) {

        if (listeSupp.find( supplement  => supplement === infoCommandeSupplement[e].nom_supplement) == undefined){
          listeSupp.push(infoCommandeSupplement[e].nom_supplement);
          listeQuantiteSupp.push(infoCommandeSupplement[e].quantite);
          listePrixTotaleSupp.push(infoCommandeSupplement[e].prix_supplement*infoCommandeSupplement[e].quantite);
        }
        else{
          let index: number = listeSupp.indexOf(infoCommandeSupplement[e].nom_supplement);
              if (index !== -1) {
                listeQuantiteSupp[index] += infoCommandeSupplement[e].quantite;
                listePrixTotaleSupp[index] += infoCommandeSupplement[e].prix_supplement*infoCommandeSupplement[e].quantite;
              }
        }
      }

      let factureRestaurantSupp = {}
      for(let e in listeSupp){


        factureRestaurantSupp[listeSupp[e]] = {
          nom_supplement : listeSupp[e],
          quantite  : listeQuantiteSupp[e],
          prixTotale :  listePrixTotaleSupp[e]
        };
      }

      const prixTotaleCommande = listePrixTotale.reduce((a, b) => a + b, 0) + listePrixTotaleSupp.reduce((a, b) => a + b, 0);
      const data = new Date();
    const prevdate = new Date();
    const previousMonth = new Date(prevdate.getTime());
    previousMonth.setDate(0);
    const prevMonthNum = previousMonth.getMonth().toString() + previousMonth.getFullYear().toString();
    const prevMonthTxt = previousMonth.toLocaleString('default', { month: 'long' });
    const currYear = prevdate.getFullYear().toString();
      const month = data.toLocaleString('default', { month: 'long' });


     return {prefix : this.prefix, nomEntreprise: entrepriseName, data : factureRestaurant, dataSupp : factureRestaurantSupp, prixTotaleCommande : prixTotaleCommande, month : month, prevMonthTxt: prevMonthTxt, prevMonthNum: prevMonthNum, currYear: currYear};

    }

  @Get('/facture/:entrepriseName/:month')
    @Render('restaurantFacturePagePrecedent')
  async previousMonthFacture(@Param('entrepriseName') entrepriseName: string, @Param('month') month: string) {

    const prevdate = new Date();

    const currentDate = new Date().toISOString().split('T')[0].split('-')[1];
    const previousMonth = new Date(prevdate.getTime());
    const nextMonth = previousMonth.toLocaleString('default', { month: 'long'});
    previousMonth.setDate(0);
    const prevMonthTxt = previousMonth.toLocaleString('default', { month: 'long' });

    const currYear = prevdate.getFullYear().toString();
    const numCurrentDate = Number(currentDate) - 1;
    const strCurrentDate = numCurrentDate.toString();
    const infoCommande = await this.commandeService.getAllPlatsByEntreprise(entrepriseName, strCurrentDate);
    let listePlat = [];
    let listeQuantite = [];
    let listePrixTotale = [];
    for (let e in infoCommande) {
      if (listePlat.find( plat  => plat === infoCommande[e].nom_plat) == undefined){
        listePlat.push(infoCommande[e].nom_plat);
        listeQuantite.push(infoCommande[e].quantite);
        listePrixTotale.push(infoCommande[e].prix_plat*infoCommande[e].quantite);
      }
      else{
        let index: number = listePlat.indexOf(infoCommande[e].nom_plat);
        if (index !== -1) {
          listeQuantite[index] += infoCommande[e].quantite;
          listePrixTotale[index] += infoCommande[e].prix_plat*infoCommande[e].quantite;
        }
      }
    }

    let factureRestaurant = {}
    for(let e in listePlat){


      factureRestaurant[listePlat[e]] = {
        nom_plat : listePlat[e],
        quantite  : listeQuantite[e],
        prixTotale :  listePrixTotale[e]
      };
    }

    const infoCommandeSupplement = await this.commandeService.getAllSupplementsByEntreprise(entrepriseName, strCurrentDate);
    let listeSupp = [];
    let listeQuantiteSupp = [];
    let listePrixTotaleSupp = [];
    for (let e in infoCommandeSupplement) {

      if (listeSupp.find( supplement  => supplement === infoCommandeSupplement[e].nom_supplement) == undefined){
        listeSupp.push(infoCommandeSupplement[e].nom_supplement);
        listeQuantiteSupp.push(infoCommandeSupplement[e].quantite);
        listePrixTotaleSupp.push(infoCommandeSupplement[e].prix_supplement*infoCommandeSupplement[e].quantite);
      }
      else{
        let index: number = listeSupp.indexOf(infoCommandeSupplement[e].nom_supplement);
        if (index !== -1) {
          listeQuantiteSupp[index] += infoCommandeSupplement[e].quantite;
          listePrixTotaleSupp[index] += infoCommandeSupplement[e].prix_supplement*infoCommandeSupplement[e].quantite;
        }
      }
    }

    let factureRestaurantSupp = {}
    for(let e in listeSupp){


      factureRestaurantSupp[listeSupp[e]] = {
        nom_supplement : listeSupp[e],
        quantite  : listeQuantiteSupp[e],
        prixTotale :  listePrixTotaleSupp[e]
      };
    }

    const prixTotaleCommande = listePrixTotale.reduce((a, b) => a + b, 0) + listePrixTotaleSupp.reduce((a, b) => a + b, 0);


    return { prefix : this.prefix,
      nomEntreprise: entrepriseName,
      data: factureRestaurant,
      dataSupp: factureRestaurantSupp,
      prixTotaleCommande: prixTotaleCommande,
      month: prevMonthTxt,
      nextMonth: nextMonth,
      currYear: currYear,
      pathGlobal: this.pathGlobal,
    };
  }


  @Post('/marquerCommandePrete/:commandeId')
  async markCommandeAsReady(@Param('commandeId') commandeId: string, @Res() res) {
    try {
      const idCommande: number = parseInt(commandeId, 10);
      console.log("ide ", idCommande)

      await this.commandeService.markCommandeAsReady(idCommande);

      return res.status(200).json({ message: 'Commande marquée comme prête' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Une erreur s\'est produite' });
    }
  }

  @Get('/factures')
  @Render('facturePage')
  facturePageFunction() {
    const command = this.commandeService;


    return {command: command, prefix : this.prefix};

  }
}
