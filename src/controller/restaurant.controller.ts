import { Controller, Get, Render } from '@nestjs/common';

@Controller('restaurant')
export class RestaurantController {


    @Get('')
    @Render('restaurantPage')
    async restaurant() {}

}
