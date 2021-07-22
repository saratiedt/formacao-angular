import { CadastroUsuarioService } from './service/cadastro-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from './usuario';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
})
export class CadastroUsuarioComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servico: CadastroUsuarioService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [''],
      fullName: [''],
      userName: [''],
      password: [''],
    });
  }

  cadastrar() {
    const novoUsuario = this.form.getRawValue() as Usuario; // caso o modelo usuario possua os mesmos nomes que form
    console.log(novoUsuario);
  }
}
