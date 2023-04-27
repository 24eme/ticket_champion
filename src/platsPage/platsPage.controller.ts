import { Controller, Get } from '@nestjs/common';

@Controller('plats')
export class PlatsPageController {
  @Get()
  index(): string {
    return 'This is the plats page!';
  }
}
