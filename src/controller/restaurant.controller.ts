import { Controller, Get, Render, Post, Body, Req, Query } from '@nestjs/common';
import { CommandeService } from 'src/services/commande.service';


@Controller('/')
export class RestaurantController {

    constructor(private readonly commandeService: CommandeService) {
     
      }


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


}
