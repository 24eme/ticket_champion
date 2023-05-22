import { Controller, Get, Render, Post, Body, Req, Query, Param, HttpCode, Res, Redirect } from '@nestjs/common';
import { CommandeService } from 'src/services/commande.service';

@Controller('/')
export class RestaurantController {
     
    private nonEntreprise : string;
    private time : string;

    constructor(private readonly commandeService: CommandeService) {
      
    }

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
}
