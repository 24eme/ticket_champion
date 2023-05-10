import { Controller, Get, Render } from '@nestjs/common';
import { CommandeService } from 'src/services/commande.service';

@Controller('restaurant')
export class RestaurantController {

    constructor(private readonly commandeService: CommandeService) {
     
      }


    @Get('')
    @Render('restaurantPage')
    async restaurant() {
        const result = await this.commandeService.getClientCommandesGroupedByEntreprise();
        return { data: result };
    }

}
