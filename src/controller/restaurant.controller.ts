
import { Controller, Get, Render } from '@nestjs/common';
import { CommandeService } from 'src/services/commande.service';

@Controller('/')
export class RestaurantController {

    constructor(private readonly commandeService: CommandeService) {
     
      }


    @Get('/restaurant')
    @Render('restaurantPage')
    async restaurant() {
        const result = await this.commandeService.getClientCommandesGroupedByEntreprise();
        return { data: result };
    }


    @Get('/historique')
    @Render('restaurantHistoriquePage')
    async historique() {
      const totalCost = await this.commandeService.getTotalCostCommandesGroupedByEntreprise();
      console.log(totalCost);
      return { data: totalCost };
    
    }


}
