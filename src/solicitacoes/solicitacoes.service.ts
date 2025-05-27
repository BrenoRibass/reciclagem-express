import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
 import { Atribuicao } from './entities/atribuicao.entity';
import { CriarSolicitacaoDto } from './dto/create-solicitacoe.dto';
import { Solicitacao } from './entities/solicitacoe.entity';
import { UpdateSolicitacaoDto } from './dto/update-solicitacoe.dto';
  
@Injectable()
export class SolicitacoesService {
  constructor(
    @InjectRepository(Solicitacao)
    private readonly solicitacaoRepo: Repository<Solicitacao>,

    @InjectRepository(Atribuicao)
    private readonly atribuicaoRepo: Repository<Atribuicao>,
  ) {}

  async create(solicitanteId: number, dto: CriarSolicitacaoDto) {
    const nova = this.solicitacaoRepo.create({
      ...dto,
      solicitante_id: solicitanteId,
    });
    return this.solicitacaoRepo.save(nova);
  }

  async findMinhas(solicitanteId: number) {
    return this.solicitacaoRepo.find({
      where: { solicitante_id: solicitanteId },
      order: { criado_em: 'DESC' },
    });
  }

  async update(solicitanteId: number, id: number, dto: UpdateSolicitacaoDto) {
    const solicitacao = await this.solicitacaoRepo.findOne({ where: { id } });

    if (!solicitacao) {
      throw new NotFoundException('Solicitação não encontrada');
    }

    if (solicitacao.solicitante_id !== solicitanteId) {
      throw new ForbiddenException('Você não pode editar esta solicitação');
    }

    await this.solicitacaoRepo.update(id, dto);
    return this.solicitacaoRepo.findOne({ where: { id } });
  }

  async listarElegiveis() {
    return this.solicitacaoRepo.find({
      where: [
        { status: 'pendente' },
        { status: 'aceita' },
      ],
      order: { criado_em: 'ASC' },
    });
  }

  async listarAtribuidas(prestadorId: number) {
    return this.atribuicaoRepo.find({
      where: {
        prestador_id: prestadorId,
        status: 'aceita',
      },
      relations: ['solicitacao'],
      order: { data_aceitacao: 'DESC' },
    });
  }

  async aceitarSolicitacao(prestadorId: number, solicitacaoId: number) {
    const solicitacao = await this.solicitacaoRepo.findOne({ where: { id: solicitacaoId } });

    if (!solicitacao) {
      throw new NotFoundException('Solicitação não encontrada');
    }

    if (solicitacao.status === 'cancelada' || solicitacao.status === 'concluida') {
      throw new BadRequestException('Solicitação não pode mais ser aceita');
    }

    const jaAtribuida = await this.atribuicaoRepo.findOne({
      where: {
        solicitacao_id: solicitacaoId,
        prestador_id: prestadorId,
      },
    });

    if (jaAtribuida) {
      throw new BadRequestException('Você já aceitou essa solicitação');
    }

    return this.atribuicaoRepo.save({
      solicitacao_id: solicitacaoId,
      prestador_id: prestadorId,
      status: 'aceita',
    });
  }

  async cancelarAtribuicao(prestadorId: number, atribuicaoId: number) {
    const atribuicao = await this.atribuicaoRepo.findOne({ where: { id: atribuicaoId } });

    if (!atribuicao || atribuicao.prestador_id !== prestadorId) {
      throw new ForbiddenException('Você não pode cancelar essa atribuição');
    }

    if (atribuicao.status !== 'aceita') {
      throw new BadRequestException('Somente atribuições ativas podem ser canceladas');
    }

    atribuicao.status = 'recusada';
    return this.atribuicaoRepo.save(atribuicao);
  }

  async finalizarAtribuicao(prestadorId: number, atribuicaoId: number) {
  const atribuicao = await this.atribuicaoRepo.findOne({
    where: { id: atribuicaoId },
    relations: ['solicitacao'],
  });

  if (!atribuicao || atribuicao.prestador_id !== prestadorId) {
    throw new ForbiddenException('Você não pode finalizar esta atribuição');
  }

  if (atribuicao.status !== 'aceita') {
    throw new BadRequestException('Somente atribuições ativas podem ser finalizadas');
  }

  atribuicao.status = 'finalizada';
  atribuicao.data_conclusao = new Date();

  await this.atribuicaoRepo.save(atribuicao);

   atribuicao.solicitacao.status = 'concluida';
  await this.solicitacaoRepo.save(atribuicao.solicitacao);

  return { message: 'Solicitação finalizada com sucesso' };
}

}
