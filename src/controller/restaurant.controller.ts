import { Controller, Get, Render, Post, Body, Req, Query, Param } from '@nestjs/common';
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
    //@Render('restaurantPage')
    async envoirestaurantinfo(@Body() body: any, @Req() req : Request) {
      console.log(req.body);
      const keys = Object.keys(req.body);
      const values = Object.values(req.body)[0].split(' ');
      const nombre = values[0];
      const entreprise  = values[values.length - 1];
      console.log(entreprise); 
      console.log(nombre);
      console.log(keys);
    }
    
  
    @Post('/commandesInfo')
    //@Render('commandesInfoPage')

  async postRestaurant(@Body('entreprise') entreprise : string, @Body('heure_de_livraison') heure : string ) {

    console.log(entreprise);
    console.log(heure);
    this.time = heure;
    this.nonEntreprise = entreprise;
   
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
