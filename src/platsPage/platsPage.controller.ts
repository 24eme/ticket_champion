import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';

@Controller('/plats')
export class PlatsPageController {
  @Get()  
  @Render('plats')
  async root() {
    const data = await this.getPlatPage();
    //creer un nouveau objet 
    return { data : data}; 
  }
  
  async getPlatPage() {
  const data = JSON.parse(fs.readFileSync('platsconfig.json', 'utf8'));
  //console.log(data) 
  return { data };
  }

}
