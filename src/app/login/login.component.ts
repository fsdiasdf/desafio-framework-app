import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  nome: string;
  username: string;
  password: string;

  cadastrando: boolean;
  mensagemSucesso: string;
  errors: string[];

  constructor(
    private router : Router,
    private authService: AuthService
  ) { }

  onSubmit(){
    this.authService
      .tentarLogar(this.username, this.password)
      .subscribe(response => {
        const access_token = JSON.stringify(response)
        localStorage.setItem('access_token', access_token)
        this.router.navigate(['/home'])
      }, HttpErrorResponse => {
        this.errors = ['Usuário e/ou senha incorreto(s).']
      })

  }

  preparaCadastrar(event){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }

  cadastrar(){
    const usuario: Usuario = new Usuario();
    usuario.nome = this.nome;
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService.salvar(usuario)
    .subscribe(response => {
      this.mensagemSucesso = "cadastro realizado com sucesso! Efetue o login."
      this.cadastrando = false;
      this.nome = '';
      this.username = '';
      this.password = '';
      this.errors = [];
    }, errorResponse => {
      this.errors = errorResponse.error.errors;
      this.mensagemSucesso = null;
    });
  }
}
