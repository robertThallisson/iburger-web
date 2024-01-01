import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { toFloatString } from '../funcoes/funcoes';

@Pipe({
  name: 'mbiPipe'
})
export class MBIPipe implements PipeTransform {
  constructor(public currencyPipe: CurrencyPipe) {
    moment.locale('pt');
  }

  transform(value: any, ...args: any[]): any {
   let retorno: any = null;
    switch (args[0]) {
      case 'money': {
        retorno = value ? this.currencyPipe.transform(value, 'BRL', true) : '' ;
        break;
      }
      case 'date-full' : {
        if (value instanceof Date) {
          retorno = value ? moment(value).format('DD/MMM/YYYY HH:mm:ss') : '';
        } else {
          retorno = value ? moment(moment(value, 'DD/MM/YYYY HH:mm:ss').toDate()).format('DD/MMM/YYYY HH:mm:ss') : '';
        }
        break;
      }

      case 'date' : {
        if (value instanceof Date) {
          retorno = value ? moment(value).format('DD/MMM/YYYY') : '';
        } else {
          retorno = value ? moment(moment(value, 'DD/MM/YYYY').toDate()).format('DD/MMM/YYYY') : '';
        }
        break;
      }

      case 'date-month' : {
        if (value instanceof Date) {
          retorno = value ? moment(value).format('DD/MMM') : '';
        } else {
          retorno = value ? moment(moment(value, 'DD/MM/YYYY HH:mm:ss').toDate()).format('DD/MMM') : '';
        }
        break;
      }


      case 'horus' : {
        if (value instanceof Date) {
          retorno = value ? moment(value).format('HH:mm') : '';
        } else {
          retorno = value ? moment(moment(value, 'DD/MM/YYYY HH:mm:ss').toDate()).format('HH:mm') : '';
        }
        break;
      }

      case 'boolean' : {
        retorno =  value ? 'S' : 'N';
        break;
      }

      case 'number': {
        retorno = toFloatString(value);
        break;
      }
    }
    return retorno;
  }

}
