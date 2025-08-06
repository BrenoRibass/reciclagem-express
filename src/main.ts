import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Request, Response } from 'express'; // Importação necessária

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Reciclagem Express API')
    .setDescription('API para solicitação e coleta de lixo')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Configuração para servir arquivos estáticos
  app.useStaticAssets(join(__dirname, '..', '..','public'));
  
  // Rota para servir o frontend
  app.getHttpAdapter().get('/', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', 'public', 'login.html'));
  });

  // Rota para manter o "Hello World"
  app.getHttpAdapter().get('/hello', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
