import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha_hash: string;

  @Column({ nullable: true })
  telefone: string;

  @Column()
  tipo_usuario: 'solicitante' | 'prestador' | 'admin';

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  criado_em: Date;
}
