import { Controller, Get, Render, Post, Body, Req, Query } from '@nestjs/common';
import { CommandeService } from 'src/services/commande.service';

@Controller('/')
export class RestaurantController {

    constructor(private readonly commandeService: CommandeService) {}

    @Get('restaurant')
    @Render('restaurantPage')
    async restaurant() {
        const result = await this.commandeService.getClientCommandesGroupedByEntreprise();
        return { data: result };
    }
  
    @Post('/restaurant')
    @Render('restaurantPage')

  async postRestaurant(@Body() body: any, @Req() req : Request) {

    console.log(req.body);
    const keys = Object.keys(req.body);
    console.log(keys[1]);
   
  }


    @Get('/commandesInfo')
    @Render('commandesInfoPage')
    async getCommandesInfo() {
       const Info = await this.commandeService.getCommandesInfoPerEntreprise('24EME', '12h00');
       console.log(Info.at(1).commandeSupplements.at(0).quantite);
       return { commandes: Info };
    }


    @Get('/historique')
    @Render('restaurantHistoriquePage')
    async historique() {
      const totalCost = await this.commandeService.getTotalCostCommandesGroupedByEntreprise();
      console.log(totalCost);
      return { data: totalCost };
    
    }


}
