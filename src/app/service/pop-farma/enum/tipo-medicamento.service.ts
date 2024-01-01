import { Injectable } from '@angular/core';
import { TipoMedicamento } from '../../../model/enums/tipo-medicamento.enum';

@Injectable({
  providedIn: 'root'
})
export class TipoMedicamentoService {

  tipo: TipoMedicamento;

  lista = [];
  constructor() {
    this.getTipos();
  }

  private getTipos() {
    const tipos = [];
    for (var x in TipoMedicamento) {
      try {
        const valueNome = this.nomeExibicao((x as any as TipoMedicamento));
        if (valueNome !== '') {
          tipos.push({ tipo:  Number(x ), nome: valueNome });
        }
      } catch (error) {

      }

    }
    tipos.push({ tipo: null, nome: 'Nenhum'});
    this.lista = tipos;
    //  this.lista = tipos.splice(tipos.length / 2, tipos.length / 2);
  }

  getByTipo(tipo: any) {
    let value;

    this.lista.forEach((element) => {
      try {
        if (
          element.tipo === tipo ||
          element.tipo === TipoMedicamento[tipo]
        ) {
          value = element;
        }
      } catch (error) { }
    });

    return value;
  }

  nomeExibicao(tipo: TipoMedicamento): string {
    tipo = Number(tipo);
    let retorno = '';
    switch (tipo) {
      case (TipoMedicamento.ETICO): {
        retorno = 'Ético';
        break;
      }

      case (TipoMedicamento.SIMILAR): {
        retorno = 'Similar';
        break;
      }

      case (TipoMedicamento.GENERICO): {
        retorno = 'Genérico';
        break;
      }
    }

    return retorno;
  }
}
