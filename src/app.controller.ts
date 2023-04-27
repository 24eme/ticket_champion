import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {}
}
