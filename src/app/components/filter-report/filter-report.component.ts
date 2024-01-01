import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Base } from '../../model/base';

const noop = () => {
};
@Component({
  selector: 'filter-report',
  templateUrl: './filter-report.component.html',
  styleUrls: ['./filter-report.component.scss'],
  providers: [MakeProvider(FilterReportComponent)]
})
export class FilterReportComponent implements ControlValueAccessor, OnInit {

  @Input() nome: string;
  @Input() innerValue;
  @Input() service: any;
  @Output() ionAposPesquisar = new EventEmitter<any>();

  itensCheck = [{nome: 'não filtar', value: null}, {nome: 'sim', value: true}, {nome: 'não', value: false}]
  constructor(
    private base: Base
  ) { }
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    this.value = value;
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {

  }
  ngOnInit() {
  }
  filtrar() {
    this.base.present();
    this.service.montarFiltro();
    this.service.filtrar().subscribe(
      data => {
        try {
          if (data.length === 0) {
            this.base.mensagemAlerta('Nenhum registro encontrado');
          }
        } catch (error) {
        }
        this.base.dismiss();
        this.value = data;
        this.ionAposPesquisar.emit({});
      },
      erro => {
        this.base.dismiss();
        this.base.mensagemErro(' Erro ao pesquisar ' + this.nome.toLowerCase() + ' ' + this.base.tratarErro(erro));
      }
    );
  }
}

export function MakeProvider(type: any) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}
