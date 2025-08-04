import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { AppService } from './app.service';

interface Coleta {
  id: string;
  material: string;
  quantidade: number;
  local: string;
  data: Date;
}

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('coletas')
  getColetas(): Coleta[] {
    return this.appService.getColetas();
  }

  @Post('coletas')
  createColeta(@Body() coletaData: Omit<Coleta, 'id' | 'data'>): Coleta {
    return this.appService.createColeta(coletaData);
  }

  @Delete('coletas/:id')
  deleteColeta(@Param('id') id: string): { message: string } {
    return this.appService.deleteColeta(id);
  }

  @Get('status')
  getApiStatus() {
    return { status: 'online', timestamp: new Date() };
  }
}