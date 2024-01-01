import { Base } from './../../model/base';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewChild,
} from '@angular/core';
import { ModalController, IonInput } from '@ionic/angular';
import { CustomListModalPage } from '../custom-list-modal/custom-list-modal.page';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { _isNullOrWhiteSpace, getValueField } from '../../funcoes/funcoes';

const noop = () => {};
@Component({
  selector: 'search-selectable',
  templateUrl: './search-selectable.component.html',
  styleUrls: ['./search-selectable.component.scss'],
  providers: [MakeProvider(SearchSelectableComponent)],
})
export class SearchSelectableComponent implements ControlValueAccessor, OnInit {
  @Input() service;
  @Input() metodo;
  @Input() itemValueField = 'id';
  @Input() itemTextField = 'id;nome';
  @Input() isMultiple: boolean = false;
  @Input() minLenght = 0;
  @Input() name;
  @Input() innerValue: any;
  @Input() isReadOnly = false;
  @Input() searchFull = false;
  @Input() args: any;
  @Input() size: number = 200;


  @Output() inputValueChange = new EventEmitter<any>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSelect = new EventEmitter<any>();

  @Output() onClean = new EventEmitter<any>();
  nameShow = '';


  @ViewChild('pesquisa', { static: false }) myInput: IonInput;

  valor;
  constructor(public modalController: ModalController, public base: Base) {}

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    this.value = value;
    if (!this.base._isNullOrWhiteSpace(value)) {
      this.nameShow = this.getNome();
    } else {
      this.nameShow = '';
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

  ngOnInit() {}
  ionViewWillEnter() {}

  async pesquisarItens(event: any) {
    if (this.isReadOnly) {
      return;
    }
    const modal = await this.modalController.create({
      component: CustomListModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        service: this.service,
        metodo: this.metodo,
        itemValueField: this.itemValueField,
        itemTextField: this.itemTextField,
        isMultiple: this.isMultiple,
        minLenght: this.minLenght,
        ngModel: this.innerValue,
        searchFull: this.searchFull,
        args: this.args
      },
    });
    modal.present();
    const { data } = await modal.onWillDismiss();
    if (this.base._isNullOrWhiteSpace(data)) {
      return;
    }

    try {
      if (!this.isMultiple) {
        if (this.base._isNullOrWhiteSpace(data.ngModel[this.itemValueField])) {
          return;
        }
      }
    } catch (error) {

    }
    if (this.isMultiple && !_isNullOrWhiteSpace(this.value)) {
      this.value.concat(data.ngModel);
      
    } else {
      this.value = data.ngModel;
    }
   
    if (!this.base._isNullOrWhiteSpace(data.ngModel) && data.ngModel !== {}) {
      this.onSelect.emit({ item: data.ngModel });
    } else {
      if ( data.ngModel === {}) {
        this.value = null;
      }
    }
    this.nameShow = this.getNome();

    setTimeout(() => {
      this.myInput.setFocus();
    //  this.read = true;
    },300);
  //  this.read = false;
  }

  keyDown(event: any) {
   
    if (event.keyCode === 13) {
      this.pesquisarItens(event);
      event.stopImmediatePropagation();
      event.cancelBubble = true;
      event.stopPropagation();
    }

  }

  getEspaco(value: string): string {
    return this.base._isNullOrWhiteSpace(value) ? '' : ' - ';
  }

  getNome(item?: any) {
    if (this.base._isNullOrWhiteSpace(item)) {
      item = this.innerValue;
    }
    if (this.base._isNullOrWhiteSpace(item)) {
      return '';
    }

    return getValueField(item, this.itemTextField);

    /*


    const divisor = ((this.itemTextField
      ? this.itemTextField
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
      const fields = ((this.itemTextField
        ? this.itemTextField
        : item.toString()) as string).split('.');
      if (fields.length > 1) {
        let novoItem = item;
        fields.forEach((element) => {
          novoItem = novoItem[element];
        });
        return novoItem.toString();
      }
      return this.itemTextField ? item[this.itemTextField] : item.toString();
    } */
  }

  change(newValue) {
    console.log('newvalue cange', newValue);
  }

  temItem() {
    const b = this.isMultiple  ?   !_isNullOrWhiteSpace(this.innerValue) && this.innerValue.length > 0:  !_isNullOrWhiteSpace(this.innerValue);
    return b;
  }

  getStyle(): string {
    try {
       return this.isMultiple ? this.size + 'px' : '';
    } catch (error) {
      return '';
    }
  }

  deletar() {
    if (this.isReadOnly) {
      return;
    }
    this.value = null;
    this.nameShow = this.getNome();
    this.onClean.emit({})
  }

  excluir(index: number){
    this.value.splice(index, 1);
  }


  focus() {
    this.myInput.setFocus();
  }
}

export function MakeProvider(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true,
  };
}
