import { Controller, Get, Post, Render } from '@nestjs/common';
import { CommandeService } from 'src/services/commande.service';

@Controller('/')
export class RestaurantController {

    constructor(private readonly commandeService: CommandeService) {
     
      }


    @Get('')
    @Render('restaurantPage')
    async restaurant() {
        const result = await this.commandeService.getClientCommandesGroupedByEntreprise();
        return { data: result };
    }


    @Get('/historique')
    @Render('restaurantHistoriquePage')
    @Post()
    async historique() {}

}
