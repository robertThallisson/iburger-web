/* eslint-disable quote-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/component-selector */
import { Base } from './../../model/base';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IonButton, IonInput, ModalController } from '@ionic/angular';
import { focaDaMeiaNoite, getValueField } from '../../funcoes/funcoes';

@Component({
  selector: 'custom-list-modal',
  templateUrl: './custom-list-modal.page.html',
  styleUrls: ['./custom-list-modal.page.scss'],
})
export class CustomListModalPage implements OnInit {
  value: string;

  service: any;

  metodo: any;

  itens = [];

  @Input() minLenght = 0;
  // obrigatorios

  @Input() itemValueField = 'id';

  @Input() itemTextField = 'id;nome';
  @Input() isMultiple: boolean = false;
  @Input() ngModel: any;
  @ViewChild('pesquisa', { static: true }) myInput: IonInput;
  @Input() searchFull = false;
  @Input() args: any;


  @ViewChild('itemPesquisa', { static: true }) itemPesquisa: any;

  typingTimer;
  doneTypingInterval = 700;
  constructor(public modalController: ModalController, private base: Base) { }

  ngOnInit() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150);
  }
  ionViewWillEnter() {
    this.myInput.setFocus();
    setTimeout(() => {
      this.myInput.setFocus();
    }, 500);
  }

  pesquisar() {

    console.log(this.service);
    let pesquisa =
      this.base._isNullOrWhiteSpace(this.value) && this.searchFull
        ? ' '
        : this.value;

    if (this.base._isNullOrWhiteSpace(this.value) && !this.searchFull) {
      this.base.mensagemAviso('Digite um valor para pesquisa');
      return;
    }
    this.base.present();
    if (this.base._isNullOrWhiteSpace(this.metodo)) {
      this.service.pesquisar(pesquisa).subscribe(
        (data) => {
          this.itens = data as any;
          this.base.dismiss();

          //document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));
          // document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));
          /*
                      const body = window.document.body;
                      body.dispatchEvent(new (window.window as any).KeyboardEvent('keydown', {
                          keyCode: 9,
                          bubbles: true,
                          cancelable: true
                      }));*/

          setTimeout(() => {
            this.myInput.setFocus();
          }, 500);

        },
        (erro) => {
          console.log(erro);
          this.base.dismiss();
          setTimeout(() => {
            this.myInput.setFocus();
          }, 500);
        }
      );
    } else {
      pesquisa =
        this.base._isNullOrWhiteSpace(pesquisa) &&
          !this.base._isNullOrWhiteSpace(this.args)
          ? ' '
          : this.value;
      if (!this.base._isNullOrWhiteSpace(this.args)) {
        this.metodo(this.args, pesquisa).subscribe(
          (data) => {
            this.itens = data as any;
            this.base.dismiss();
            setTimeout(() => {
              this.myInput.setFocus();
            }, 500);
          },
          (erro) => {
            console.log(erro);
            this.base.dismiss();
            setTimeout(() => {
              this.myInput.setFocus();
            }, 500);
          }
        );
      } else {
        if (this.base._isNullOrWhiteSpace(pesquisa) && this.searchFull) {
          pesquisa = ' ';
        }
        this.metodo(pesquisa).subscribe(
          (data) => {
            this.itens = data as any;
            this.base.dismiss();
            setTimeout(() => {
              this.myInput.setFocus();
            }, 500);
          },
          (erro) => {
            console.log(erro);
            this.base.dismiss();
            setTimeout(() => {
              this.myInput.setFocus();
            }, 500);
          }
        );
      }
    }
  }

  possuemItens() {
    try {
      return this.itens.length > 0;
    } catch (error) {
      return false;
    }
  }

  getEspaco(value: string): string {
    return this.base._isNullOrWhiteSpace(value) ? '' : ' - ';
  }

  getNome(item?: any) {
    if (this.base._isNullOrWhiteSpace(item)) {
      item = this.ngModel;
    }
    if (this.base._isNullOrWhiteSpace(item)) {
      return '';
    }

    return getValueField(item, this.itemTextField);
  }

  getNomeByText(item: any, textField: []) { }

  keyDown(event: any) {
    //   console.log(event);

    console.log(document.activeElement);

    if (event.keyCode === 13) {
      clearTimeout(this.typingTimer);
      this.pesquisar();
    }

    if (event.keyCode === 27) {
      this.closeAny();
    }
  }
  onKeyUp(event: any) {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(this.pesquisar.bind(this), this.doneTypingInterval);
  }
  selecionar(item: any) {
    if (this.isMultiple) {
      if (this.base._isNullOrWhiteSpace(this.ngModel)) {
        this.ngModel = [];
        this.ngModel.push(item);
      } else {
        let remove = -1;

        for (let i = 0; i < this.ngModel.length; i++) {
          const value = this.ngModel[i];
          if (value[this.itemValueField] === item[this.itemValueField]) {
            remove = i;
          }
        }

        if (remove === -1) {
          this.ngModel.push(item);
        } else {
          this.ngModel.splice(remove, 1);
        }
      }
    } else {
      this.ngModel = item;
      this.ok();
    }
  }

  ok() {
    this.close({
      dismissed: true,
      itemValueField: this.itemValueField,
      itemTextField: this.itemTextField,
      isMultiple: this.isMultiple,
      minLenght: this.minLenght,
      ngModel: this.ngModel,
    });
  }

  estaSelecionavel(item: any): boolean {
    if (this.base._isNullOrWhiteSpace(this.ngModel)) {
      return false;
    }

    if (!this.isMultiple) {
      return item[this.itemValueField] === this.ngModel[this.itemValueField];
    }
    let retorno = false;
    this.ngModel.forEach((element) => {
      if (item[this.itemValueField] === element[this.itemValueField]) {
        retorno = true;
        return true;
      }
    });

    return retorno;
  }

  closeAny() {
    this.close({
      dismissed: true,
      itemValueField: this.itemValueField,
      itemTextField: this.itemTextField,
      isMultiple: this.isMultiple,
      minLenght: this.minLenght,
      ngModel: this.isMultiple ? [] : {},
    });
  }
  close(obj: any) {
    this.modalController.dismiss(obj);
  }

  clean() {
    if (this.isMultiple) {
      this.ngModel = [];
    } else {
      this.ngModel = {};
    }
  }

  ionFocus(event: any) {
    console.log(event);
    setTimeout(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Tab' }));
    });
  }
}
