import { Transferencia } from './../models/transferencia';
import { TransferenciasService } from './../services/transferencias.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss'],
})
export class ExtratoComponent implements OnInit {
  @Input() transferencias: Transferencia[];
  constructor(private service: TransferenciasService) {}

  ngOnInit(): void {
    this.service.getTodasTransferencias().subscribe((transferencias: Transferencia[]) => {
      this.transferencias = transferencias;
    })
  }
}
