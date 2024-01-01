/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../model/objetc/usuario';
import { Router } from '@angular/router';
import { AutentificacaoService } from '../service/autentificacao/autentificacao.service';
import { Token } from '../model/seguranca/token';
import { Base } from '../model/base';
import { UsuarioService } from '../service/pop-farma/usuario.service';
import { Preferences } from '@capacitor/preferences';
import { _isNullOrWhiteSpace } from '../funcoes/funcoes';
declare let cordova: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  type: boolean = true;
  isLogin = false;

  error;
  constructor(
    private router: Router,
    private autentificacaoService: AutentificacaoService,
    private base: Base,
    private usuarioService: UsuarioService
  ) { }

  async ngOnInit() {
    const user = await Preferences.get({ key: 'user' });
    if  ( !_isNullOrWhiteSpace(user.value)) {
      this.autoLogin(JSON.parse(user.value));
    }


  }

  changeType() {
    this.type = !this.type;
  }

  onSubmit(form: NgForm) {
    this.base.present();
    console.log(form.form.value);
    if (!form.valid){
      return;
    }



    const usuario: Usuario = new Usuario();
    Object.assign(usuario, form.value);
    this.usuarioService.getToken(usuario).subscribe(
      data => {
        this.base.dismiss();
        this.autentificacaoService.token = data as Token;
        usuario.senha = btoa(usuario.senha);
        this.login();
        Preferences.set({key: 'user', value: JSON.stringify(usuario)});
      }, error => {
        this.base.dismiss();
        this.base.mensagemErro('Falha ao acessar :\n' + this.base.tratarErro(error));
        this.error = JSON.stringify(error);
      }
    );
  }


  olhadinha() {
    this.base.present();
    this.usuarioService.as.getNewTokenRegisto().subscribe(
      data => {
        this.base.dismiss();
        this.autentificacaoService.token = data as Token;
        this.login();
      }, error => {
        this.base.dismiss();
        this.base.mensagemErro('Falha ao acessar :\n' + this.base.tratarErro(error));
        this.error = JSON.stringify(error);
      }
    );
  }

  autoLogin(usuario: Usuario) {
    usuario.senha = atob(usuario.senha);
    this.base.present();
    this.usuarioService.getToken(usuario).subscribe(
      data => {
        this.base.dismiss();
        this.autentificacaoService.token = data as Token;
        this.login();
      }, error => {
        this.base.dismiss();
        this.base.mensagemErro('Falha ao acessar :\n' + this.base.tratarErro(error));
        this.error = JSON.stringify(error);
      }
    );
  }
  login() {
    this.autentificacaoService.getTokenDecode();
    this.isLogin = true;
    this.router.navigate(['/home']);
  }

  navigate(data?) {

    this.router.navigate(data);
  }
  keyDownFunction(event: any, form: NgForm) {
    if (event.keyCode === 13) {
      this.onSubmit(form);
    }
  }

}
