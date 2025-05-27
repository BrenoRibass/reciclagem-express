import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Request,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { SolicitacoesService } from './solicitacoes.service';
 
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CriarSolicitacaoDto } from './dto/create-solicitacoe.dto';
import { UpdateSolicitacaoDto } from './dto/update-solicitacoe.dto';

@Controller('solicitacoes')
export class SolicitacoesController {
  constructor(private readonly solicitacoesService: SolicitacoesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() dto: CriarSolicitacaoDto) {
    return this.solicitacoesService.create(req.user.userId, dto);
  }

  @Get('minhas')
  @UseGuards(JwtAuthGuard)
  findMinhas(@Request() req) {
    return this.solicitacoesService.findMinhas(req.user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSolicitacaoDto,
  ) {
    return this.solicitacoesService.update(req.user.userId, id, dto);
  }

  @Get('elegiveis')
  @UseGuards(JwtAuthGuard)  
  listarElegiveis() {
    return this.solicitacoesService.listarElegiveis();
  }

  //Prestador
   // Prestador

  @Get('prestador/minhas')
  @UseGuards(JwtAuthGuard)
  listarAceitas(@Request() req) {
    return this.solicitacoesService.listarAtribuidas(req.user.userId);
  }

  @Post('prestador/aceitar')
  @UseGuards(JwtAuthGuard)
  aceitar(@Request() req, @Body() body: { solicitacao_id: number }) {
    return this.solicitacoesService.aceitarSolicitacao(
      req.user.userId,
      body.solicitacao_id,
    );
  }

  @Patch('prestador/:id/finalizar')
  @UseGuards(JwtAuthGuard)
  finalizar(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.solicitacoesService.finalizarAtribuicao(req.user.userId, id);
  }

  @Patch('prestador/:id/cancelar')
  @UseGuards(JwtAuthGuard)
  cancelar(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.solicitacoesService.cancelarAtribuicao(req.user.userId, id);
  }



}
