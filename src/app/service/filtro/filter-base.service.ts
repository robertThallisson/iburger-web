import { Pesquisa } from '../../model/objetc/filtro/pesquisa';
import { GridMenu } from '../../model/objetc/filtro/clausula';
import { Filtro } from '../../model/objetc/filtro/filtro';
import { Injectable } from '@angular/core';
import { _isNullOrWhiteSpace, getValueField } from '../../funcoes/funcoes';
import { HttpClient } from '@angular/common/http';
import { AutentificacaoService } from '../autentificacao/autentificacao.service';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export abstract class FilterBase<T> extends BaseService<T> {
  filtro: Filtro = new Filtro();
  value: T;

  public clausulas: Array<GridMenu> = new Array<GridMenu>();


  abstract montarClausulas();
  constructor(
    public http: HttpClient,
    public as: AutentificacaoService
  ) {
    super(http, as);
  }

  filtrar() {
    return this.http.post(
      this.as.url + this.url + '/filtrar',
      this.filtro,
      this.as.getOptions()
    );
  }

  montarFiltro() {
    this.filtro.pesquisas = new Array<Pesquisa>();
    this.clausulas.forEach((element) => {
      element.list.forEach((value) => {
        if (
          _isNullOrWhiteSpace(value.value) &&
          _isNullOrWhiteSpace(value.value2)
        ) {
          return;
        }
        const pesquisa: Pesquisa = new Pesquisa();
        pesquisa.nome = value.nome;
        if (
          value.component === 'between_date' ||
          value.component === 'between_number'
        ) {
          if (
            !_isNullOrWhiteSpace(value.value) &&
            !_isNullOrWhiteSpace(value.value2)
          ) {
            pesquisa.comparacao = value.comparacao;
            pesquisa.valor = value.getValue() + ' and ' + value.getValue2();
          } else {
            if (!_isNullOrWhiteSpace(value.value)) {
              pesquisa.comparacao = '>=';
              pesquisa.valor = value.getValue();
            }
            if (!_isNullOrWhiteSpace(value.value2)) {
              pesquisa.comparacao = '<=';
              pesquisa.valor = value.getValue2();
            }
          }
        } else {
          pesquisa.comparacao = value.comparacao;
          pesquisa.valor = value.getValue();
        }

        switch (value.component) {
          case 'selected': {
            pesquisa.descricaoFiltro = value.descricao + ': ' + getValueField(value.value, value.fieldame);
            break;
          }
          case 'text': {
            pesquisa.descricaoFiltro = value.descricao + ' contém ' + value.value;
            break;
          }
          case 'number': {
            pesquisa.descricaoFiltro = value.descricao + ' maior igual a ' + value.value;
            break;
          }
          case 'data': {
            pesquisa.descricaoFiltro = value.descricao + ' igual a ' + value.value;
            break;
          }
          case 'between_date': {
            if (
              !_isNullOrWhiteSpace(value.value) &&
              !_isNullOrWhiteSpace(value.value2)
            ) {
              pesquisa.descricaoFiltro = value.descricao + ' entre ' + value.value + ' a ' + value.value2;
            } else {
              if (!_isNullOrWhiteSpace(value.value)) {
                pesquisa.descricaoFiltro = value.descricao + ' maior que ' + value.value;
              }
              if (!_isNullOrWhiteSpace(value.value2)) {
                pesquisa.descricaoFiltro = value.descricao + ' menor que ' + value.value;
              }
            }
            break;
          }
          case 'check': {
            pesquisa.descricaoFiltro = value.descricao + ': ' + value.value;
            break;
          }
          case 'between_number': {
            if (
              !_isNullOrWhiteSpace(value.value) &&
              !_isNullOrWhiteSpace(value.value2)
            ) {
              pesquisa.descricaoFiltro = value.descricao + ' entre ' + value.value + ' a ' + value.value2;
            } else {
              if (!_isNullOrWhiteSpace(value.value)) {
                pesquisa.descricaoFiltro = value.descricao + ' maior que ' + value.value;
              }
              if (!_isNullOrWhiteSpace(value.value2)) {
                pesquisa.descricaoFiltro = value.descricao + ' menor que ' + value.value;
              }
            }
            break;
          }
        }

        if (!_isNullOrWhiteSpace(pesquisa.valor)) {
          this.filtro.pesquisas.push(pesquisa);
        }
      });
    });
  }
}
