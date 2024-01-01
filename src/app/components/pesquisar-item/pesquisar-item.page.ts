import { Base } from './../../model/base';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GestureDetail, IonInput, ModalController } from '@ionic/angular';


interface ScrollDetail extends GestureDetail {
  scrollTop: number;
  scrollLeft: number;
}


@Component({
  selector: 'app-pesquisar-item',
  templateUrl: './pesquisar-item.page.html',
  styleUrls: ['./pesquisar-item.page.scss'],
})
export class PesquisarItemPage implements OnInit {
  @Input() itens = [];
  // 1 = lista do menur
  @Input() tipo = 1;

  @Input() fieldText: string;

  lista = [];
  listaFiltrada = [];

  value: string = '';
  selecionado: any;
  posicao = 0;


  @ViewChild('inp', { static: true }) myInput: IonInput;
  @HostListener('document:keydown', ['$event']) onKeyDown(event: any) {
    this.keyDown(event, this.posicao);
  }
  constructor(public modalController: ModalController, private base: Base) {}

  ngOnInit() {

  }
  ionViewDidEnter() {
    if (this.tipo === 1) {
      this.carregarMenu();
    }

    if (this.tipo === 2) {
      this.carregarListaObjetos();
    }

    this.myInput.setFocus();
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150);
  }
  carregarMenu() {
    this.itens.forEach((element, index) => {
      const inicial = element.title;
      if (!this.base._isNullOrWhiteSpace(element.children)) {
        element.children.forEach((children) => {
          this.lista.push({
            descricao: inicial + ' / ' + children.title,
            valor: children.url,
          });
        });
      } else {
				this.lista.push({
					descricao: element.title,
					valor: element.url,
				});
			}
    });

    this.lista.forEach((element) => {
      this.listaFiltrada.push(element);
    });
    this.selecionado = this.listaFiltrada[0];
  }

  carregarListaObjetos() {
    this.itens.forEach((element) => {
      this.lista.push({
        descricao: this.getNome(element),
        valor: element,
      });
    });

    this.lista.forEach((element) => {
      this.listaFiltrada.push(element);
    });
  }

  filtrar() {
    this.listaFiltrada = [];
    this.lista.forEach((element) => {
      if (
        this.base
          .especialCharMask(element.descricao.toLowerCase())
          .includes(this.base.especialCharMask(this.value.toLowerCase()))
      ) {
        this.listaFiltrada.push(element);
      }
    });
    this.posicao = 0;
    if (this.listaFiltrada.length > 0) {
      this.click(this.listaFiltrada[0], this.posicao);
    }
  }

  
  logScrolling(event: any) {
    if (event.detail.deltaY < 0) {
      if (this.posicao > 0) {
        this.posicao--;
      }
      this.selecionado = this.listaFiltrada[this.posicao];
    } else {
      if (event.detail.deltaY > 0) { 
        if (!(this.posicao === this.listaFiltrada.length - 1)) {
          this.posicao++;
        }
      }
      
      this.selecionado = this.listaFiltrada[this.posicao];
    }

  }

  dbClick(item: any) {
    this.selecionado = item;
    this.selecionar();
  }
  click(item: any, index: number) {
    this.posicao = index;
    this.selecionado = item;
  }
  selecionar() {
    this.close({ dismiss: true, valor: this.selecionado.valor });
  }
  closeAny() {
    this.modalController.dismiss({ dismiss: true, valor: null });
  }

  close(obj: any) {
    this.modalController.dismiss(obj);
  }

  keyDown(event: any, index?: number) {
    if (
      event.keyCode === 13 &&
      !this.base._isNullOrWhiteSpace(this.selecionado)
    ) {
      this.selecionar();
    }

    if (
      this.listaFiltrada.length > 0 &&
      event.keyCode === 38 &&
      !this.base._isNullOrWhiteSpace(index) &&
      !(index < 0)
    ) {
      if (index > 0) {
        index--;
        this.posicao--;
      }
      this.selecionado = this.listaFiltrada[index];
    }

    if (
      this.listaFiltrada.length > 0 &&
      event.keyCode === 40 &&
      !this.base._isNullOrWhiteSpace(index) &&
      !(index >= this.listaFiltrada.length)
    ) {
      if (!(index === this.listaFiltrada.length - 1)) {
        index++;
        this.posicao++;
      }
      this.selecionado = this.listaFiltrada[index];
    }

    if (
      this.listaFiltrada.length > 0 &&
      event.keyCode === 40 &&
      this.base._isNullOrWhiteSpace(index)
    ) {
      this.selecionado = this.listaFiltrada[0];
    }
  }


  getNome(item: any) {

    if (this.base._isNullOrWhiteSpace(item)) {
      return '';
    }
    const divisor = ((this.fieldText
      ? this.fieldText
      : item.toString()) as string).split(';');

    if (divisor.length > 1) {
      let retorno: string = '';
      divisor.forEach((elementPrincipal) => {
        const fields = (elementPrincipal as string).split('.');
        if (fields.length > 1) {
          let novoItem = item;
          fields.forEach((element) => {
            novoItem = novoItem[element];
          });
          retorno = retorno + this.getEspaco(retorno) + novoItem.toString();
        } else {
          retorno =
            retorno +
            this.getEspaco(retorno) +
            (elementPrincipal
              ? item[elementPrincipal].toString()
              : item.toString());
        }
      });
      return retorno;
    } else {
      const fields = ((this.fieldText
        ? this.fieldText
        : item.toString()) as string).split('.');
      if (fields.length > 1) {
        let novoItem = item;
        fields.forEach((element) => {
          novoItem = novoItem[element];
        });
        return novoItem.toString();
      }
      return this.fieldText ? item[this.fieldText] : item.toString();
    }
  }

  getEspaco(value: string): string {
    return this.base._isNullOrWhiteSpace(value) ? '' : ' - ';
  }
}
