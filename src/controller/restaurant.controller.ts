import { Controller, Get, Render } from '@nestjs/common';
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

    @Get('/commandesInfo')
    @Render('commandesInfoPage')
    async getCommandesInfo() {
       const Info = await this.commandeService.getCommandesInfoPerEntreprise('24EME', '12h00');
       console.log(Info.at(1).commandeSupplements.at(0).quantite);
       return { commandes: Info };
    }

}
