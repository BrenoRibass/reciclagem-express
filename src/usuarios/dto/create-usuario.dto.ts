export class CreateUsuarioDto {
  nome: string;
  email: string;
  senha_hash: string;
  telefone?: string;
  tipo_usuario: 'solicitante' | 'prestador' | 'admin';
}
