import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Base } from '../../../../model/base';
import { PesquisarItemPage } from '../../../pesquisar-item/pesquisar-item.page';
import { _isNullOrWhiteSpace } from '../../../../funcoes/funcoes';

@Component({
  selector: 'advanced-input',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss'],
})
export class AdvancedComponent implements OnInit {
  @ViewChild('valor', { static: true}) input: any;
  @Input() service: any;
  @Input() nome = 'nome';
  @Output() pesquisou = new EventEmitter<any>();

  value: any;
  constructor(
    private base: Base,
    public modalController: ModalController
  ) { }

  ngOnInit() {}

  keyPress(event: any) {
    
    if (_isNullOrWhiteSpace(this.value)) {
      return;
    }
    
    if (event.keyCode === 106 && this.value === '*') {
      this.value = '';
      return;
    }
    if (event.keyCode === 13) {
      this.service.pesquisarAdvanced(this.value).subscribe(
        async data => {
          let result = data as any;

          if (_isNullOrWhiteSpace(result) || result.length === 0) {
            return;
          }
          if (result.length === 1) {
            this.pesquisou.emit({value: result[0]});
            this.value = '';
          } else {
            const modal = await this.modalController.create({
              component: PesquisarItemPage,
              cssClass: 'my-custom-class',
              componentProps: {
                itens: result,
                tipo: 2,
                fieldText: 'nome'
              },
            });
            modal.present();
            const { data } = await modal.onWillDismiss();
            console.log(data);
        
            if (
              !this.base._isNullOrWhiteSpace(data) &&
              !this.base._isNullOrWhiteSpace(data.valor)
            ) {
              this.pesquisou.emit({value: data.valor});
              this.value = '';
            }
          }
        },
        error => {
          this.base.mensagemErro('erro ao pesquisar ' + this.base.tratarErro(error))
        }
      );
    }
  }

  setFocus() {
    this.input.setFocus();
  }

}
