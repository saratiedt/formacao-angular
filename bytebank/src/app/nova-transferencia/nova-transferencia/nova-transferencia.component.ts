import { Transferencia } from './../../models/transferencia';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TransferenciasService } from './../../services/transferencias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nova-transferencia',
  templateUrl: './nova-transferencia.component.html',
  styleUrls: ['./nova-transferencia.component.scss'],
})
export class NovaTransferenciaComponent implements OnInit {
  @Output() aoTransferir = new EventEmitter<any>();
  valor: number;
  destino: number;

  constructor(private service: TransferenciasService, private router: Router) {}

  ngOnInit(): void {}

  transferir() {
    console.log('Solicitada nova transferência');
    const valorEmitir: Transferencia = {
      valor: this.valor,
      destino: this.destino,
    };
    this.service.adicionar(valorEmitir).subscribe(
      (tranferencia: Transferencia) => {
        console.log(tranferencia);
       this.router.navigateByUrl('extrato')
      },
      (error) => console.error(error)
    );
  }

  limparCampos() {
    this.valor = 0;
    this.destino = 0;
  }
}
