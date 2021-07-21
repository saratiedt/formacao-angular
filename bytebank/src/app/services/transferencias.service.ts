import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransferenciasService {
  transferencias: any[];
  constructor() {
    this.transferencias = [];
  }

  getTransferencias() {
    return this.transferencias;
  }

  adicionar(transferencia: any) {
    this.hidratar(transferencia);
    this.transferencias.push(transferencia);
  }

  private hidratar(transferencia: any) {
    transferencia.data = new Date();
  }
}
