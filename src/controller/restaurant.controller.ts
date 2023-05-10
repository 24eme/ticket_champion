<<<<<<< HEAD
import { Controller, Get, Post, Render } from '@nestjs/common';
=======
import { Controller, Get, Render } from '@nestjs/common';
import { CommandeService } from 'src/services/commande.service';
>>>>>>> master

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
    @Post()
    async historique() {}

}
