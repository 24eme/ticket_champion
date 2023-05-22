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
      console.log(totalCost);
      return { data: totalCost };
    
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
    
}
