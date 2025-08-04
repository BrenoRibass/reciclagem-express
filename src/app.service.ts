import { Injectable } from '@nestjs/common';

interface Coleta {
  id: string;
  material: string;
  quantidade: number;
  local: string;
  data: Date;
}

@Injectable()
export class AppService {
  private coletas: Coleta[] = [
    { id: '1', material: 'PLASTICO', quantidade: 2.5, local: 'Ponto A', data: new Date() },
    { id: '2', material: 'PAPEL', quantidade: 1.8, local: 'Ponto B', data: new Date() },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  getColetas(): Coleta[] {
    return this.coletas;
  }

  createColeta(coletaData: Omit<Coleta, 'id' | 'data'>): Coleta {
    const newColeta: Coleta = {
      id: (this.coletas.length + 1).toString(),
      ...coletaData,
      data: new Date()
    };
    this.coletas.push(newColeta);
    return newColeta;
  }

  deleteColeta(id: string): { message: string } {
    const initialLength = this.coletas.length;
    this.coletas = this.coletas.filter(coleta => coleta.id !== id);
    
    if (this.coletas.length === initialLength) {
      throw new Error('Coleta não encontrada');
    }
    
    return { message: 'Coleta removida com sucesso' };
  }
}