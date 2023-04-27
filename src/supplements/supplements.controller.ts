import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';

@Controller('/supplements')
export class supplementsController {
  @Get()
  @Render('supplements')
  async root() {
    const data = await this.getSupplementPage();
    //creer un nouveau objet
    return {data: data};
  }

  async getSupplementPage() {
    const data = JSON.parse(fs.readFileSync('supplementsconfig.json', 'utf8'));
    //console.log(data)
    return {data};
  }
}