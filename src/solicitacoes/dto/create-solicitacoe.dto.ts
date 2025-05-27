import { IsString, IsOptional } from 'class-validator';

export class CriarSolicitacaoDto {
  @IsString()
  rua: string;

  @IsString()
  numero: string;

  @IsString()
  bairro: string;

  @IsString()
  cidade: string;

  @IsString()
  estado: string;

  @IsString()
  cep: string;

  @IsString()
  descricao: string;

  @IsOptional()
  @IsString()
  imagem_url?: string;
}
