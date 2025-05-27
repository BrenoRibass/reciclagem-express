import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: ConfigService.db.host,
      port: ConfigService.db.port,
      username: ConfigService.db.username,
      password: ConfigService.db.password,
      database: ConfigService.db.database,
      autoLoadEntities: true,
      synchronize: true, // cuidado: em produção, use false
    }),
    UsuariosModule,
    AuthModule,
    SolicitacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService,AuthModule],
})
export class AppModule {}
