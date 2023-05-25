import { Controller, Get, Render, Post, Req, Res, Redirect, Param } from '@nestjs/common';

import { CommandeService } from 'src/services/commande.service';

@Controller('/')
export class RestaurantController {

  private nonEntreprise : string;
  private time : string;

  constructor(private readonly commandeService: CommandeService) {}

  @Get('restaurant')
  @Render('restaurantPage')
  async restaurant() {
    const result = await this.commandeService.getClientCommandesGroupedByEntreprise();
    return { data: result };
  }

  @Post('restaurant')
  @Redirect('/commandesInfo')
  async envoirestaurantinfo(@Req() req: Request) {
    const heure = Object.keys(req.body)[0];
    const values = Object.values(req.body)[0].split(' ');
    const nombre = values[0];
    const entreprise = values[values.length - 1];
    this.nonEntreprise = entreprise;
    this.time = heure;
  }
  
  @Get('commandesInfo')
  @Render('commandesInfoPage')
  async  getCommandesInfo() {
    // Utiliser les paramètres de requête ici
    const Info = await this.commandeService.getCommandesInfoPerEntreprise(this.nonEntreprise,  this.time);
    return { commandes: Info, entreprise : this.nonEntreprise, time : this.time };
  }
  
   @Get('/historique')
   @Render('restaurantHistoriquePage')
   async historique() {
     const totalCost = await this.commandeService.getTotalCostCommandesGroupedByEntreprise();
     return { data: totalCost };
   }
  
    @Get('/facture/:entrepriseName')
    @Render('restaurantFacturePage')
    async factureRestaurant(@Param('entrepriseName') entrepriseName: string) {
      const infoCommande = await this.commandeService.getAllPlatsByEntreprise(entrepriseName);
      let listePlat = [];
      let listeQuantite = [];
      let listePrixTotale = [];
      for (let e in infoCommande) {
        console.log("e est : ", e);
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

      const infoCommandeSupplement = await this.commandeService.getAllSupplementsByEntreprise(entrepriseName);
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

      const prixTotaleCommande = listePrixTotale.reduce((a, b) => a + b, 0) + listePrixTotaleSupp.reduce((a, b) => a + b, 0);;

     return {nomEntreprise: entrepriseName, data : factureRestaurant, dataSupp : factureRestaurantSupp, prixTotaleCommande : prixTotaleCommande };
    }

 @Post('/marquerCommandePrete/:commandeId')
  async markCommandeAsReady(@Param('commandeId') commandeId: string, @Res() res) {
    try {
      // Convertissez l'ID de la commande en nombre entier
      const idCommande: number = parseInt(commandeId, 10);

      // Appelez votre service pour marquer la commande comme prête
      await this.commandeService.markCommandeAsReady(idCommande);

      // Répondez avec succès
      return res.status(200).json({ message: 'Commande marquée comme prête' });
    } catch (error) {
      // Gérez les erreurs
      console.error(error);
      return res.status(500).json({ message: 'Une erreur s\'est produite' });
    }
  }

 @Get('/factures')
  @Render('facturePage')
  facturePageFunction() {
    const command = this.commandeService;

    return command;
  }

}
