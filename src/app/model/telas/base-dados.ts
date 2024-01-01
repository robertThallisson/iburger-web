/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { getValueField, _isNullOrWhiteSpace } from '../../funcoes/funcoes';
import { BaseService } from '../../service/base.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Base } from '../base';
export abstract class BaseDados<T>  {

  urlInserir: string;

  lista: Array<T>;

  lastItem: any = null;
  lastField: string = '';
  count: number = 0;
  desativarUsandoAtivo = true;
  useSalvar = true;
  constructor(
    protected base: Base,
    protected confirmationService: ConfirmationService,
    protected router: Router,
    public service: BaseService<T>
  ) {

  }


  editar(value: T) {
    this.service.value = value;
    this.router.navigate(['/' + this.urlInserir]);
  }

  inserir() {
    this.service.value = {} as T;
    this.router.navigate(['/' + this.urlInserir]);
  }

  excluir(item: T, msg?: string) {
    this.confirmationService.confirm({
      message: msg ? msg : 'Deseja excluir este item ?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.desativarUsandoAtivo) {
          if(this.useSalvar) {
            this.desativarSimples(item);
          }

        } else {
          this.remover(item);
        }
      }
    });
  }

  desativarSimples(item: T) {
    item['ativo'] = false;
    this.base.present();
    this.service.salvar(item).subscribe(
      data => {
        this.base.menssagemSucesso('Registro removido com sucesso' );
        this.lista = [];
      },
      error => {
        this.base.dismiss();

        this.base.mensagemErro('Erro ao remover \n' + this.base.tratarErro(error));
      }
    );
  }

  deletar(item: T) {
    this.base.present();
    this.service.remover(item).subscribe(
      data => {
        this.base.menssagemSucesso('Registro removido com sucesso ' );
        this.lista = [];
      },
      error => {
        this.base.dismiss();

        this.base.mensagemErro('Erro ao remover \n' + this.base.tratarErro(error));
      }
    );
  }

  ordernar(event: any, field: string, funcao?) {
    console.log(event);
    this.lista.sort((a, b) => {
      let valueA = getValueField(a, field);
      let valueB = getValueField(b, field);
      if (funcao) {
        valueA = funcao(a);
        valueB = funcao(b);
      }
      if (this.count % 2 === 0) {

        if (valueA > valueB) {
          return 1;
        }

        if (valueA < valueB) {
          return -1;
        }
        return 0;
      } else {
        if (valueA < valueB) {
          return 1;
        }

        if (valueA > valueB) {
          return -1;
        }
        return 0;
      }

    });


    let HTMLNovo = ' ↓';
    if (this.count % 2 === 0) {
      HTMLNovo = ' ↓';
    } else {
      HTMLNovo = ' ↑';
    }


    if (!_isNullOrWhiteSpace(this.lastItem)) {
      this.lastItem.innerHTML = this.lastItem.innerHTML.substring(0, this.lastItem.innerHTML.length - 2);
    }
    let HTMLTemporario = (event.target as any).innerHTML;
    HTMLTemporario = HTMLTemporario + HTMLNovo;
    (event.target as any).innerHTML = HTMLTemporario;
    this.lastField = field;
    this.lastItem = (event.target as any);

    if (_isNullOrWhiteSpace(this.lastField) || field === this.lastField) {
      this.count++;
    } else {
      this.count = 0;
    }
  }


  abstract remover(item: T);
}
