import { Controller, Get, Render, Res } from '@nestjs/common';
import {PlatsPageService} from './platsPage.service'

@Controller('/plats')
export class PlatsPageController {

  constructor(private readonly platsPageService: PlatsPageService) {}
  @Get()  
  @Render('platsPage')
  async root() {
    const data = await this.platsPageService.getPlatFromjson();
    //creer un nouveau objet 
    return { data : data }; 
  }
 

}
