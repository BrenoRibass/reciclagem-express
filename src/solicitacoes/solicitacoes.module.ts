import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitacoesService } from './solicitacoes.service';
import { SolicitacoesController } from './solicitacoes.controller';
import { Solicitacao } from './entities/solicitacoe.entity';
import { Atribuicao } from './entities/atribuicao.entity';
 
@Module({
  imports: [TypeOrmModule.forFeature([Solicitacao,Atribuicao])],
  controllers: [SolicitacoesController],
  providers: [SolicitacoesService],
})
export class SolicitacoesModule {}
