import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bytebank';

  destino: number;
  valor: number;
  transferencia: any;

  transferir(evento) {
    console.log(evento);
    this.transferencia = evento;
  }
}
