import { Controller, Get, Render, Res } from '@nestjs/common';

@Controller('/')
export class HomePageController {

    @Get()
    @Render('HomePage')
    root() {}
}
