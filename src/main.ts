import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as express from 'express';
import { HttpException } from '@nestjs/common';
import { NotFoundExceptionFilter } from './http-exception/http-exception.filter';



async function bootstrap() {
 const app = await NestFactory.create<NestExpressApplication>(
   AppModule,);
   var path = require('path')
 app.useStaticAssets(join(__dirname, '..', 'public'));
 app.setBaseViewsDir(join(__dirname, '..', 'views'));
 hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
 //partialsDir: join(__dirname, '..', 'views/partials')
 app.setViewEngine('hbs');
 app.useGlobalFilters(new NotFoundExceptionFilter());


 await app.listen(3000);
}
bootstrap();




