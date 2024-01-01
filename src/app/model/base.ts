/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-body-style */
/* eslint-disable use-isnan */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @angular-eslint/contextual-lifecycle */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Empresa } from './objetc/empresa';
import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import {
  Platform,
  ModalController,
  ActionSheetController,
  PopoverController,
  ToastController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import * as moment from 'moment';
//import 'rxjs/add/operator/map';
import { UsuarioService } from '../service/pop-farma/usuario.service';
import { AutentificacaoService } from '../service/autentificacao/autentificacao.service';
import { Usuario } from './objetc/usuario';
import { Pessoa } from './objetc/pessoa';
import { Token } from './seguranca/token';
import { ViacepService } from '../service/viacep/viacep.service';
import { AutorizacaoService } from '../service/pop-farma/autorizacao.service';
import { Autorizacao } from './objetc/autorizacao';
import { MessageService, ConfirmationService } from 'primeng/api';
import { _isNullOrWhiteSpace } from '../funcoes/funcoes';

@Injectable({
  providedIn: 'root',
})
export class Base implements OnInit {
  private isLoading: boolean = false;
  public perguntarModulo: boolean = false;
  private administrador: boolean = undefined;
  constructor(
    public platform: Platform,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public popoverCtrl: PopoverController,
    public router: Router,
    public toast: ToastController,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    //  private opener: FileOpener,
    //  private file: File,
    public as: AutentificacaoService,
    private us: UsuarioService,
    private viaCepService: ViacepService,
    private autorizacaoService: AutorizacaoService,
    private messageService: MessageService,
    public confirmationService: ConfirmationService
  ) { }

  ngOnInit() { }


  resetAdministrador() {
    this.administrador = undefined;
  }
  public getImagem(value) {
    if (this._isNullOrWhiteSpace(value)) {
      return '/assets/img/farmacia.png';
    }
    return 'data:image/jpeg;base64,' + value;
  }

  toFloat(value: any) {
    const result = parseFloat(value.toString().replace(',', '.'));
    console.log(result);
    return result;
  }
  toFloatString(value: any): number {
    const result = parseFloat(value.toString().replace(',', ''));
    console.log(result);
    return result;
  }

  toNumber(value: any): number {
    if (this._isNullOrWhiteSpace(value)) {
      return value;
    }
    let result = value.toString().replaceAll('.', '');
    result = parseFloat(result.toString().replace(',', '.'));
    return result;
  }



  _isNullOrWhiteSpace(value: any) {
    // tslint:disable-next-line: use-isnan
    if (value === null || value === undefined || Number.isNaN(value)) {
      return true;
    }
    // Convert value to string in case if it's not.
    return value.toString().replace(/\s/g, '').length < 1;
  }

  especialCharMask(especialChar: string): string {
    especialChar = especialChar.replace(/[áàãâä]/ui, 'a');
    especialChar = especialChar.replace(/[éèêë]/ui, 'e');
    especialChar = especialChar.replace(/[íìîï]/ui, 'i');
    especialChar = especialChar.replace(/[óòõôö]/ui, 'o');
    especialChar = especialChar.replace(/[úùûü]/ui, 'u');
    especialChar = especialChar.replace(/[ç]/ui, 'c');
   /* especialChar = especialChar.replace('/[ÁÀÃÂÄ]/ui', 'a');
    especialChar = especialChar.replace('/[ÉÈÊË]/ui', 'e');
    especialChar = especialChar.replace('/[ÍÌÎÏ]/ui', 'i');
    especialChar = especialChar.replace('/[ÓÒÕÔÖ]/ui', 'o');
    especialChar = especialChar.replace('/[ÚÙÛÜ]/ui', 'u');
    especialChar = especialChar.replace('/[Ç]/ui', 'c');*/;
    return especialChar;
  }

  consultaCEP(cep: any, funcaoPopula?: any) {
    if (cep !== null && cep !== undefined && cep !== '') {
      cep = cep.replace(/\D/g, '');
      if (cep.length > 7) {
        this.present();
        this.viaCepService.consultaCEP(cep).subscribe(
          (data) => {
            const result = data as any;
            this.dismiss();
            if (
              this._isNullOrWhiteSpace(result) ||
              !this._isNullOrWhiteSpace(result.erro)
            ) {
              this.mensagemErro('Falha ao consultar endereço do CEP');
              return;
            }
            if (!this._isNullOrWhiteSpace(funcaoPopula)) {
              funcaoPopula(result);
            }
          },
          (error) => {
            this.dismiss();
            this.mensagemErro('Falha ao buscar CEP :' + this.tratarErro(error));
          }
        );
      }
    }
  }




  compareWithEnumFn = (oldValue: any, newValue: any) => {
    console.log(oldValue + ' - ' + newValue);
    try {
      return oldValue === newValue;
    } catch (error) {
      newValue = oldValue;
      return false;
    }
  };

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true,
    });
    return await popover.present();
  }

  isValidDate(data: string): boolean {
    try {
      const dtArray = data.split('/');

      if (dtArray === null) {
        return false;
      }

      // Checks for dd/mm/yyyy format.
      let dtDay;
      let dtMonth;
      let dtYear;
      try {
        dtDay = Number(dtArray[0] as any as number);
        dtMonth = Number(dtArray[1] as any as number);
        dtYear = Number((dtArray[2]).substring(0, 4) as any as number);

        // tslint:disable-next-line: use-isnan
        if (isNaN(dtDay) || isNaN(dtMonth) || isNaN(dtYear)) {
          return false;
        }
      } catch (error) {
        return false;
      }
      if (dtMonth < 1 || dtMonth > 12) {
        return false;
      } else if (dtDay < 1 || dtDay > 31) {
        return false;
      } else if (
        (dtMonth === 4 || dtMonth === 6 || dtMonth === 9 || dtMonth === 11) &&
        dtDay === 31
      ) {
        return false;
      } else if (dtMonth === 2) {
        const isleap =
          dtYear % 4 === 0 && (dtYear % 100 !== 0 || dtYear % 400 === 0);
        if (dtDay > 29 || (dtDay === 29 && !isleap)) {
          return false;
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  isValidDateHora(data: string): boolean {
    try {
      const dataHora = data.split(' ');

      if (this._isNullOrWhiteSpace(dataHora)) {
        return false;
      }

      if (!this.isValidDate(dataHora[0])) {
        return false;
      }

      const horaMinuto = dataHora[1].split(':');
      if (this._isNullOrWhiteSpace(horaMinuto)) {
        return false;
      }
      const hora = horaMinuto[0] as any;
      const minuto = horaMinuto[1] as any;

      if (hora > 23) {
        return false;
      }

      if (minuto >= 60) {
        return false;
      }

      return true;

    } catch (error) {
      return false;
    }
  }

  async present(msg?: string) {
    this.isLoading = true;
    return await this.loadingController
      .create({
        message: msg ? msg : 'Carregando...',
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => { });
          }
        });
      });
  }
  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => { });
  }

  async mensagemErro(msg: string, error?: any) {
    //     msg =  msg.replace('\n', '</br>');
    //    msg =  msg.replace('#13#10', '</br>');
    if (this.isLoading) {
      this.dismiss();
    }
    //  msg = msg.split('\n').join('</br>');
    if (_isNullOrWhiteSpace(error)) {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Erro', detail: msg, life: 5000 });
    } else {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Erro', detail: msg + '\n' + this.tratarErro(error), life: 5000 });
    }
  }


  async mensagemErroFoca(msg: string, funcao: any, paramentro: string) {
    //     msg =  msg.replace('\n', '</br>');
    //    msg =  msg.replace('#13#10', '</br>');
    if (this.isLoading) {
      this.dismiss();
    }
    msg = msg.split('\n').join('</br>');
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class-erro',
      header: 'Erro',
      message: '<strong style=\'color = black;\'>' + msg + ' </strong>',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        },
      ],
    });
    await alert.present();
    const { data } = await alert.onWillDismiss();
    console.log(data);
    funcao(paramentro);
  }


  async mensagemAlerta(msg: string) {
    msg = msg.split('\n').join('</br>');
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Atenção', detail: msg, life: 5000 });
  }

  async mensagemAviso(msg: string, titulo?: string) {
    msg = msg.split('\n').join('</br>');
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Atenção', detail: msg, life: 5000 });
  }

  async presentAlertConfirm(funcao, valor, isto, msg: string) {
    await this.confirmationService.confirm({
      message: 'Messagem: <strong>' + msg + '</strong>!!!',
      accept: () => {
        funcao(valor, isto);
      }
    });

  }
  async Confirma(msg: string, funcao, paramentro?: any) {

    await this.confirmationService.confirm({
      message: 'Messagem: <strong>' + msg + '</strong>!!!',
      accept: () => {
        if (paramentro !== undefined) {
          funcao(paramentro);
        } else {
          funcao();
        }
      }
    });

  }

  menssagemSucesso(msg: string) {
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Sucesso', detail: msg, life: 5000 });
  }

  tratarErro(value: any) {
    console.log(value);
    if (_isNullOrWhiteSpace(value.error)) {
      return value.toString();
    }

    if (
      value.error.mensagemUsuario !== undefined &&
      value.error.mensagemUsuario !== null
    ) {
      return value.error.mensagemUsuario;
    } else {
      if (
        value.error.error_description !== undefined &&
        value.error.error_description !== null
      ) {
        return value.error.error_description;
      } else {
        if (
          value.error instanceof Blob &&
          value.error.type === 'application/json'
        ) {
          return 'Nenhum dado encontrado';
        } else {
          return value.error.toString();
        }
      }
    }
  }

  abrirPDF(data: any, nome: string) {
    nome = nome + '.pdf';

  }

  save(blob, fileName) {
    // FileSaver.saveAs(blob, fileName);
  }

  vazio(value: string) {
    return value === undefined || value === null || value === '';
  }
  async atualizarSenha(usuario: Usuario) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class-dialog',
      header: ' Alteração de Senha ',
      subHeader: 'Usuário: ' + usuario.login,
      backdropDismiss: false,
      inputs: [
        {
          name: 'senhaAntiga',
          type: 'password',
          placeholder: 'Senha antiga',
          min: -5,
          max: 10,
        },
        {
          name: 'novaSenha',
          type: 'password',
          placeholder: 'Nova senha',
          min: -5,
          max: 10,
        },
        {
          name: 'confirmacaoSenha',
          type: 'password',
          placeholder: 'Repita nova senha',
          min: -5,
          max: 10,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log(data);
            if (this.as.deveAtualizarSenha) {
              this.mensagemErro('Usuario Deve Atualizar Senha !');
              this.as.logout();
              this.router.navigate(['login']);
            }
          },
        },
        {
          text: 'Confirmar',
          handler: (data) => {
            if (
              data.novaSenha === undefined ||
              data.novaSenha === null ||
              data.novaSenha === ''
            ) {
              this.mensagemErro('Senha em branco');
              return false;
            }
            if (data.novaSenha !== data.confirmacaoSenha) {
              this.mensagemErro('Senhas dever ser iguais');
              return false;
            }
            this.present('Atualizando Senha');
            const msgErro = 'Erro ao atualizar senha :';
            usuario.senha = data.senhaAntiga;
            this.us.confirmaSenha(usuario).subscribe(
              (retorno) => {
                console.log(retorno);
                usuario.senha = data.novaSenha;
                this.us.salvarSoUsuario(usuario).subscribe(
                  () => {
                    this.dismiss();
                    this.as.deveAtualizarSenha = false;
                    this.mensagemAlerta('Senha alterada com sucesso');
                  },
                  (error) => {
                    this.dismiss();
                    this.mensagemErro(msgErro + this.tratarErro(error));
                    return false;
                  }
                );
              },
              (error) => {
                this.mensagemErro(msgErro + this.tratarErro(error));
                this.dismiss();
                return false;
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  async esqueceuSenha() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class-dialog',
      header: ' Esqueceu Senha ',
      backdropDismiss: false,
      inputs: [
        {
          name: 'cpf',
          type: 'text',
          placeholder: 'CPF do usuário',
          min: -5,
          max: 10,
        },
        {
          name: 'novaSenha',
          type: 'password',
          placeholder: 'Nova senha',
          min: -5,
          max: 10,
        },
        {
          name: 'confirmacaoSenha',
          type: 'password',
          placeholder: 'Repita nova senha',
          min: -5,
          max: 10,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log(data);
            if (this.as.deveAtualizarSenha) {
              this.mensagemErro('Usuário Deve Atualizar Senha !');
              this.as.logout();
              this.router.navigate(['login']);
            }
          },
        },
        {
          text: 'Confirmar',
          handler: (data) => {
            if (
              data.cpf === undefined ||
              data.cpf === null ||
              data.cpf === ''
            ) {
              this.mensagemErro('CPF branco');
              return false;
            }
            if (
              data.novaSenha === undefined ||
              data.novaSenha === null ||
              data.novaSenha === ''
            ) {
              this.mensagemErro('Senha em branco ');
              return false;
            }
            if (data.novaSenha !== data.confirmacaoSenha) {
              this.mensagemErro('Senhas dever ser iguais');
              return false;
            }
            this.present('Atualizando Senha');
            const msgErro = 'Erro ao atualizar senha :';
            const usuario: Usuario = new Usuario();
            usuario.pessoa = new Pessoa();
            usuario.pessoa.cpfCnpj = data.cpf;
            usuario.senha = data.novaSenha;
            this.as.getNewTokenRegisto().subscribe(
              (parameter) => {
                this.as.token = parameter as Token;
                this.us.esqueceuSenha(usuario).subscribe(
                  () => {
                    this.menssagemSucesso('Senha altera com sucesso');
                    this.dismiss();
                    this.as.token = null;
                  },
                  (error) => {
                    this.mensagemErro(msgErro + this.tratarErro(error));
                    this.dismiss();
                    this.as.token = null;
                    return false;
                  }
                );
              },
              (error) => {
                this.dismiss();
                this.as.token = null;
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }


  async autorizar(permissao: string, funcao: any) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class-dialog',
      header: ' Autorizar ',
      backdropDismiss: false,
      inputs: [
        {
          name: 'usuario',
          type: 'text',
          placeholder: 'usuário',
          min: -5,
          max: 10,
        },
        {
          name: 'senha',
          type: 'password',
          placeholder: 'Nova senha',
          min: -5,
          max: 10,
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log(data);
          },
        },
        {
          text: 'Confirmar',
          handler: (data) => {
            if (
              data.usuario === undefined ||
              data.usuario === null ||
              data.usuario === ''
            ) {
              this.mensagemErro('usuario branco');
              return false;
            }
            if (
              data.senha === undefined ||
              data.senha === null ||
              data.senha === ''
            ) {
              this.mensagemErro('Senha em branco ');
              return false;
            }

            this.present('Autorizando...');
            const autorizacao: Autorizacao = new Autorizacao();
            autorizacao.usuario = data.usuario;
            autorizacao.senha = data.senha;
            autorizacao.permissao = permissao;
            this.autorizacaoService.autorizar(autorizacao).subscribe(
              data => {
                this.dismiss();
                if (funcao) {
                  funcao();
                }
              },
              error => {
                this.dismiss();
                this.mensagemErro('Erro: ' + this.tratarErro(error));
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }


  isAdiministrador() { }


  getUsuarioToken(): Usuario {
    return this.as.token.usuario;
  }


  /*  GUARDAR PARA USAR NO FUTURO
 async atualizarSenha(usuario: Usuario) {

        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Prompt!',
            inputs: [
              {
                name: 'name1',
                type: 'text',
                placeholder: 'Placeholder 1'
              },
              {
                name: 'name2',
                type: 'text',
                id: 'name2-id',
                value: 'hello',
                placeholder: 'Placeholder 2'
              },
              // multiline input.
              {
                name: 'paragraph',
                id: 'paragraph',
                type: 'textarea',
                placeholder: 'Placeholder 3'
              },
              {
                name: 'name3',
                value: 'http://ionicframework.com',
                type: 'url',
                placeholder: 'Favorite site ever'
              },
              // input date with min & max
              {
                name: 'name4',
                type: 'date',
                min: '2017-03-01',
                max: '2018-01-12'
              },
              // input date without min nor max
              {
                name: 'name5',
                type: 'date'
              },
              {
                name: 'name6',
                type: 'number',
                min: -5,
                max: 10
              },
              {
                name: 'name7',
                type: 'number'
              },
              {
                name: 'name8',
                type: 'password',
                placeholder: 'Advanced Attributes'
              }
            ],
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  console.log('Confirm Cancel');
                }
              }, {
                text: 'Ok',
                handler: () => {
                  console.log('Confirm Ok');
                }
              }
            ]
          });

          await alert.present();

    }
    */

}
