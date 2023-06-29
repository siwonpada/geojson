import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Coodinate, Radius } from './dto/geojson.dto';
import { Location } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('test');
    return this.appService.getHello();
  }

  @Post('test')
  @UsePipes(ValidationPipe)
  create(@Body() coord: Coodinate): Promise<Location> {
    return this.appService.createLocation(coord);
  }

  @Get('test')
  @UsePipes(new ValidationPipe({ transform: true }))
  find(@Query() r: Radius, @Body() coord: Coodinate): Promise<Location[]> {
    return this.appService.getLocationFrom(coord, r);
  }
}
