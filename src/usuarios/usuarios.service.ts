import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

async create(createUsuarioDto: CreateUsuarioDto) {
  const existente = await this.findByEmail(createUsuarioDto.email);
  if (existente) {
    throw new BadRequestException(`Já existe um usuário com o e-mail ${createUsuarioDto.email}`);
  }

  const senha_hash = await bcrypt.hash(createUsuarioDto.senha_hash, 10);
  const novoUsuario = this.usuarioRepository.create({ ...createUsuarioDto, senha_hash });
  return this.usuarioRepository.save(novoUsuario);
}

  findAll() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  }

 async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
  await this.findOne(id); // garante que existe

  delete updateUsuarioDto.email;
  delete updateUsuarioDto.senha_hash;

  await this.usuarioRepository.update(id, updateUsuarioDto);
  return this.findOne(id);
}


  async remove(id: number) {
    const usuario = await this.findOne(id);
    return this.usuarioRepository.remove(usuario);
  }

  async findByEmail(email: string) {
  return this.usuarioRepository.findOne({ where: { email } });
}

}
