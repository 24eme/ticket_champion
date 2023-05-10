import { Controller, Get, Post, Render } from '@nestjs/common';

@Controller('/')
export class RestaurantController {


    @Get('/restaurant')
    @Render('restaurantPage')
    async restaurant() {}


    @Get('/historique')
    @Render('restaurantHistoriquePage')
    @Post()
    async historique() {}

}
