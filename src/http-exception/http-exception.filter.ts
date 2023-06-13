import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { join } from 'path';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(_exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    var path = require('path')
    //let lePath = join( __dirname, '..', 'views', '404-page.hbs') ;
    response.status(404).sendFile(join(process.cwd(),'views', '404-page.html'))
    //console.log(lePath);
    //response.sendFile(lePath);   
  }
}
