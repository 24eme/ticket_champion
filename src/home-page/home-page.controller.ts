import { Controller, Get, Render, Res } from '@nestjs/common';

@Controller('home-page')
export class HomePageController {

    @Get()
    @Render('HomePage')
    root() {}
}
