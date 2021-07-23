import { Router } from '@angular/router';
import { UsuarioExisteService } from './service/usuario-existe/usuario-existe.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from './usuario';
import { minusculoValidator } from './minusculo.validators';
import { CadastroUsuarioService } from './service/cadastro-usuario/cadastro-usuario.service';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
})
export class CadastroUsuarioComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servico: CadastroUsuarioService,
    private servicoValidacao: UsuarioExisteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        fullName: ['', [Validators.required, Validators.minLength(4)]],
        userName: [
          '',
          [minusculoValidator],
          [this.servicoValidacao.usuarioJaexiste()],
        ],
        password: [''],
      },
      { validators: [usuarioSenhaIguaisValidator] }
    );
  }

  cadastrar() {
    if (this.form.valid) {
      const novoUsuario = this.form.getRawValue() as Usuario; // caso o modelo usuario possua os mesmos nomes que form
      this.servico.cadastraNovoUsuario(novoUsuario).subscribe(
        () => {
          this.router.navigateByUrl('');
        },
        (error) => {
          console.log('ocorreu um erro');
        }
      );
    }
  }
}
