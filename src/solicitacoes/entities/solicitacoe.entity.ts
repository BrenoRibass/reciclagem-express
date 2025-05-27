import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

export type StatusSolicitacao = 'pendente' | 'aceita' | 'concluida' | 'cancelada';

@Entity('solicitacoes')
export class Solicitacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  solicitante_id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'solicitante_id' })
  solicitante: Usuario;

  @Column({ type: 'varchar', length: 255 })
  rua: string;

  @Column({ type: 'varchar', length: 20 })
  numero: string;

  @Column({ type: 'varchar', length: 100 })
  bairro: string;

  @Column({ type: 'varchar', length: 100 })
  cidade: string;

  @Column({ type: 'varchar', length: 2 })
  estado: string;

  @Column({ type: 'varchar', length: 20 })
  cep: string;

  @Column('text')
  descricao: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagem_url: string;

  @Column({
    type: 'enum',
    enum: ['pendente', 'aceita', 'concluida', 'cancelada'],
    default: 'pendente',
  })
  status: StatusSolicitacao;

  @CreateDateColumn({ type: 'timestamp' })
  criado_em: Date;
}
