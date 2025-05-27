import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
 import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Solicitacao } from './solicitacoe.entity';

export type StatusAtribuicao = 'aceita' | 'recusada' | 'finalizada';

@Entity('atribuicoes')
export class Atribuicao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  solicitacao_id: number;

  @ManyToOne(() => Solicitacao)
  @JoinColumn({ name: 'solicitacao_id' })
  solicitacao: Solicitacao;

  @Column()
  prestador_id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'prestador_id' })
  prestador: Usuario;

  @CreateDateColumn()
  data_aceitacao: Date;

  @Column({ type: 'datetime', nullable: true })
  data_conclusao: Date;

  @Column({
    type: 'enum',
    enum: ['aceita', 'recusada', 'finalizada'],
    default: 'aceita',
  })
  status: StatusAtribuicao;
}
