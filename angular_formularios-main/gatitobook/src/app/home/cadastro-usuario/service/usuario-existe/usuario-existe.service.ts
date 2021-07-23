import { AbstractControl } from '@angular/forms';
import { CadastroUsuarioService } from './../cadastro-usuario/cadastro-usuario.service';
import { Injectable } from '@angular/core';
import { switchMap, map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioExisteService {
  constructor(private cadastroUsuarioService: CadastroUsuarioService) {}

  usuarioJaexiste() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((nomeUsuario) =>
          this.cadastroUsuarioService.verificaUsuarioExistente(nomeUsuario)
        ),
        map((usuarioExiste: any) => usuarioExiste ? {usuarioExistente: true} : null
        ),
        first()
      );
    };
  }
}
