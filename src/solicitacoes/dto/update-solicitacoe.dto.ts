import { IsOptional, IsString, IsIn } from 'class-validator';
import { StatusSolicitacao } from '../entities/solicitacoe.entity';


export class UpdateSolicitacaoDto {
  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  imagem_url?: string;

  @IsOptional()
  @IsIn(['pendente', 'aceita', 'concluida', 'cancelada'])
  status?: StatusSolicitacao;
}
