import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../usuario';

@Injectable({
  providedIn: 'root',
})
export class CadastroUsuarioService {
  urlBackend = `${environment.backend}user`;

  constructor(private httpClient: HttpClient) {}

  cadastraNovoUsuario(usuario: Usuario) {
    return this.httpClient.post<Usuario>(`${this.urlBackend}/signup`, usuario);
  }

  verificaUsuarioExistente(nomeUsuario: string) {
    return this.httpClient.get(`${this.urlBackend}/exists/${nomeUsuario}`);
  }
}
