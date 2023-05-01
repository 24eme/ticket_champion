import { Controller, Get, Render, Res } from '@nestjs/common';
import { SupplementsService } from './supplementsPage.service';

@Controller('/supplements')
export class supplementsController {

  constructor(private readonly supplementsService: SupplementsService) {}
  @Get()
  @Render('supplementsPage')
  async root() {
    const data = await this.supplementsService.getSupplementFromJson();
    //creer un nouveau objet
    return {data: data};
  }

 
}