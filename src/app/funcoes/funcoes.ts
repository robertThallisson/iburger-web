/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import * as moment from 'moment';
enum Direction {
  UP = 'up',
  DOWN = 'down'
}
export function focaDaMeiaNoite(name: string) {
  try {
    const elements = document.getElementsByName(name);
    setTimeout(() => elements[0].focus(), 150);
    elements.forEach((element) => {
      console.log(element);
      console.log(element.outerHTML);
      // tslint:disable-next-line: prefer-for-of
      setTimeout(() => element.focus(), 150);
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < element.children.length; index++) {
        const children = element.children[index];
        (children as HTMLElement).focus();
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < children.children.length; i++) {
          const filho = children.children[i];
          console.log(filho);
          console.log(filho.outerHTML);
          if (filho.outerHTML.startsWith('<ion-input')) {
            setTimeout(() => (filho as HTMLElement).focus(), 300);
          }
        }
        setTimeout(() => (children as HTMLElement).focus(), 150);
      }
    });
    setTimeout(() => elements[0].focus(), 150);
  } catch (error) {
    console.log(error);
  }
}

export function getNumeros(value: string): string {
  return value.replace(/([^\d])+/gim, '');
}

export function _isNullOrWhiteSpace(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  // Convert value to string in case if it's not.
  return value.toString().replace(/\s/g, '').length < 1;
}

export function getLanguage() {
  let language = localStorage.getItem('language');
  if (_isNullOrWhiteSpace(language)) {
    language = 'pt';
  }

  return language;
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function pad(character: string, count: number, value: string, left: boolean) {
  const pad = character.repeat(count);
  if (typeof value === 'undefined') {
    return pad;
  }
  if (left) {
    return (pad + value).slice(-pad.length);
  } else {
    return (value + pad).substring(0, pad.length);
  }
}

export function formatCPF(cpf: string) {
  const aux = getNumeros(cpf);
  return `${aux.substring(0, 3)}.${aux.substring(3, 6)}.${aux.substring(6, 9)}-${aux.substring(9)}`;
}

export function formatCNPJ(cnpj: string) {
  const aux = getNumeros(cnpj);
  return `${aux.substring(0, 2)}.${aux.substring(2, 5)}.${aux.substring(5, 8)}/${aux.substring(8, 12)}-${aux.substring(12)}`;
}

export function toHex(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}

export function getMontanteJurosComposto(valor: number, qtdParcelas: number, juros: number) {
  let valorJuro = 0;
  let valorParcela = round(valor / qtdParcelas);
  const valorOiginal = valorParcela;
  let montante: number = 0;
  for (let i = 0; i <= qtdParcelas - 1; i++) {
    valorJuro += (valorParcela * (juros / 100));
    montante += valorJuro;

    valorParcela = valorOiginal + valorJuro;
  }
  return montante;
}




export function round2(value: number, digits: number = 2, dir: Direction = Direction.DOWN): number {
  const round = dir === Direction.DOWN ? Math.floor : Math.ceil;
  return round(value * (10 ** digits)) / (10 ** digits);
}

export function round(value: number, casa: number = 2): number {
  const valorString = value.toString();

  if (valorString.indexOf('e+') !== -1) {
    return toFloatString(value.toFixed(2));
  }

  const vetor = valorString.split('.');
  const primeiroValor = vetor[0];

  if (vetor.length <= 1) {
    return toFloatString(primeiroValor);
  }

  const segundoValor = vetor[1];

  if (segundoValor.length === 1) {
    return toFloatString(primeiroValor + '.' + segundoValor);
  } else {
    console.log('depois da virgula ' + segundoValor.substring(0, 1));
    const sobra = segundoValor.substring(0, 2);
    return toFloatString(primeiroValor + '.' + segundoValor.substring(0, casa));
  }

}

export function retiraPercentual(valor: number, percentual: number): number {
  try {
    return (percentual / 100) * valor;
  } catch (error) {
    return 0;
  }
}

export function descobrirPercentual(valor: number, parteDoValor: number) {
  try {
    return (parteDoValor / valor) * 100;
  } catch (error) {
    return 0;
  }
}

export function toFloatString(value: any): number {
  const result = parseFloat(value.toString().replace(',', ''));
  console.log(result);
  return result;
}

export function getImagemBranco() {
  // eslint-disable-next-line @typescript-eslint/semi
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB0QAAADICAYAAAB4WlKSAAAAAXNSR0IArs4c6QAAGxlJREFUeF7t2UERAAAIAkHpX9oeN2sDFn/sHAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBKICi+YSiwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAmcQ9QQECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECGQFDKLZagUjQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMAg6gcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMgKGESz1QpGgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIBB1A8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJAVMIhmqxWMAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAGDqB8gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCArYBDNVisYAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIGUT9AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBWwCCarVYwAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMon6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGsgEE0W61gBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYRP0AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJZAYNotlrBCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwiPoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSyAgbRbLWCESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBgEPUDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhkBQyi2WoFI0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDAIOoHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDIChhEs9UKRoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAQdQPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQFTCIZqsVjAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABg6gfIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgK2AQzVYrGAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBlE/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAVsAgmq1WMAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDKJ+gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBrIBBNFutYAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIGET9AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECWQGDaLZawQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMIj6AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEsgIG0Wy1ghEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYBD1AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIZAUMotlqBSNAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAwCDqBwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQyAoYRLPVCkaAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgEHUDxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgkBUwiGarFYwAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAYOoHyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICtgEM1WKxgBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgZRP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFbAIJqtVjACBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAyifoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgayAQTRbrWAECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBhE/QABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAlkBg2i2WsEIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDCI+gECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBLICBtFstYIRIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGAQ9QMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECGQFDKLZagUjQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMAg6gcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMgKGESz1QpGgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIBB1A8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJAVMIhmqxWMAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAGDqB8gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCArYBDNVisYAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIGUT9AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBWwCCarVYwAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMon6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGsgEE0W61gBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYRP0AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJZAYNotlrBCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwiPoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSyAgbRbLWCESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBgEPUDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhkBQyi2WoFI0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDAIOoHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDIChhEs9UKRoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAQdQPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQFTCIZqsVjAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABg6gfIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgK2AQzVYrGAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBlE/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAVsAgmq1WMAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDKJ+gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBrIBBNFutYAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIGET9AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECWQGDaLZawQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMIj6AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEsgIG0Wy1ghEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYBD1AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIZAUMotlqBSNAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAwCDqBwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQyAoYRLPVCkaAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgEHUDxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgkBUwiGarFYwAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAYOoHyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICtgEM1WKxgBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgZRP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFbAIJqtVjACBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAyifoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgayAQTRbrWAECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBhE/QABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAlkBg2i2WsEIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDCI+gECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBLICBtFstYIRIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGAQ9QMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECGQFDKLZagUjQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMAg6gcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMgKGESz1QpGgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIBB1A8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJAVMIhmqxWMAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAGDqB8gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCArYBDNVisYAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIGUT9AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBWwCCarVYwAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMon6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGsgEE0W61gBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYRP0AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJZAYNotlrBCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwiPoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSyAgbRbLWCESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBgEPUDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhkBQyi2WoFI0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDAIOoHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDIChhEs9UKRoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAQdQPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQFTCIZqsVjAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABg6gfIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgK2AQzVYrGAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBlE/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAVsAgmq1WMAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDKJ+gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBrIBBNFutYAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIGET9AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECWQGDaLZawQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMIj6AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEsgIG0Wy1ghEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYBD1AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIZAUMotlqBSNAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAwCDqBwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQyAoYRLPVCkaAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgEHUDxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgkBUwiGarFYwAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAYOoHyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICtgEM1WKxgBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgZRP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFbAIJqtVjACBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAyifoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgayAQTRbrWAECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBhE/QABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAlkBg2i2WsEIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDCI+gECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBLICBtFstYIRIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGAQ9QMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECGQFDKLZagUjQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMAg6gcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMgKGESz1QpGgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIBB1A8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJAVMIhmqxWMAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAGDqB8gQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQCArYBDNVisYAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIGUT9AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgEBWwCCarVYwAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMon6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGsgEE0W61gBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYRP0AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQJZAYNotlrBCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAwiPoBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgSyAgbRbLWCESBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBgEPUDBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAhkBQyi2WoFI0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDAIOoHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBDIChhEs9UKRoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAQdQPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQFTCIZqsVjAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABg6gfIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEAgK2AQzVYrGAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBlE/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIBAVsAgmq1WMAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDKJ+gAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgACBrIBBNFutYAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIGET9AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECWQGDaLZawQgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMIj6AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEsgIG0Wy1ghEgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYBD1AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIZAUMotlqBSNAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAwCDqBwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQyAoYRLPVCkaAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgEHUDxAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgkBUwiGarFYwAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAYOoHyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICtgEM1WKxgBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgZRP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAQFbAIJqtVjACBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAyifoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgayAQTRbrWAECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBhE/QABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAlkBg2i2WsEIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDCI+gECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBLICBtFstYIRIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGAQ9QMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECGQFDKLZagUjQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMAg6gcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEMgKGESz1QpGgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgIBB1A8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIJAVMIhmqxWMAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIEHZxsAyeXr5nUAAAAASUVORK5CYII='
}

export function getImagemByte(value: string) {
  return 'data:image/jpeg;base64,' + value;
}

export function percentual(valor: number, valor2: number) {
  return valor2 > 0 ? valor / valor2 * 100 : 0;
}


export function pregMatch(regex: string, str: string) {
  return new RegExp(regex).test(str);
}


export function xmlToJson(xml) {

  // Create the return object
  let obj = {};

  if (xml.nodeType === 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj['@attributes'] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        const attribute = xml.attributes.item(j);
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) { // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      const nodeName = item.nodeName;
      if (typeof (obj[nodeName]) == 'undefined') {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof (obj[nodeName].push) === 'undefined') {
          const old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
};

export function exportExcelHtml(id: string, name: string) {
  const content = document.getElementById(id);
  const base64 = (s) => window.btoa(unescape(encodeURIComponent(s.normalize('NFD').replace(/[\u0300-\u036f–]/g, ''))));
  if (content) {
    const value = `<html xmlns:o="urn:schemas-microsoft-com:office:office" ` +
      `xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">` +
      `<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>` +
      `<x:Name>PlanilhaTeste</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>` +
      `</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->` +
      `</head><body>${content.innerHTML}</body></html>`;
    const link = document.createElement('a');
    link.href = 'data:application/vnd.ms-excel;base64,' + base64(value);
    link.download = name + '.xls' || 'Workbook.xls';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}




// eslint-disable-next-line no-var
export var tablesToExcel = (function() {
  const uri = 'data:application/vnd.ms-excel;base64,';
  const tmplWorkbookXML = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'
      + '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Axel Richter</Author><Created>{created}</Created></DocumentProperties>'
      + '<Styles>'
      + '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>'
      + '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>'
      + '</Styles>'
      + '{worksheets}</Workbook>';
      const tmplWorksheetXML = '<Worksheet ss:Name="{nameWS}"><Table>{rows}</Table></Worksheet>';
      const tmplCellXML = '<Cell{attributeStyleID}{attributeFormula}{mergeCount}><Data>{data}</Data></Cell>';
      const base64 = function({ s }: { s }) { return window.btoa(unescape(encodeURIComponent(s)));};
      const format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p];});};
  //  ss:Type="{nameType}"
  return function(tables, wsnames, wbname, appname, multipleSheet = true) {
    let ctx = {};
    let workbookXML = '';
    let worksheetsXML = '';
    let rowsXML = '';

    for (let i = 0; i < tables.length; i++) {
      if (!tables[i].nodeType) {
        tables[i] = document.getElementById(tables[i]);
      }
      ctx = {
        mergeCount: ' ss:MergeAcross="' + tables[i].rows[0].cells.length + '"',
        attributeStyleID: ''
        , nameType: 'String'
        , data: wsnames[i]
        , attributeFormula: ''
      };
      rowsXML += '<Row>' + format(tmplCellXML, ctx) + '</Row>';
      for (let j = 0; j < tables[i].rows.length; j++) {
        rowsXML += '<Row>';
        for (let k = 0; k < tables[i].rows[j].cells.length; k++) {
          const dataType = tables[i].rows[j].cells[k].getAttribute('data-type');
          const dataStyle = tables[i].rows[j].cells[k].getAttribute('data-style');
          let dataValue = tables[i].rows[j].cells[k].getAttribute('data-value');
          dataValue = (dataValue) ? dataValue : tables[i].rows[j].cells[k].innerHTML;
          let dataFormula = tables[i].rows[j].cells[k].getAttribute('data-formula');
          dataFormula = (dataFormula) ? dataFormula : (appname === 'Calc' && dataType === 'DateTime') ? dataValue : null;
          ctx = {
            mergeCount: ''
            , attributeStyleID: (dataStyle === 'Currency' || dataStyle === 'Date') ? ' ss:StyleID="' + dataStyle + '"' : ''
            , nameType: (dataType === 'Number' || dataType === 'DateTime' || dataType === 'Boolean' || dataType === 'Error') ? dataType : 'String'
            , data: (dataFormula) ? '' : dataValue
            , attributeFormula: (dataFormula) ? ' ss:Formula="' + dataFormula + '"' : ''
          };
          rowsXML += format(tmplCellXML, ctx);
        }
        rowsXML += '</Row>';
      }
      if (multipleSheet) {
        ctx = { rows: rowsXML, nameWS: wsnames[i] || 'Planilha' + i };
        worksheetsXML += format(tmplWorksheetXML, ctx);
        rowsXML = '';
      }
    }

    if (!multipleSheet) {
      ctx = { rows: rowsXML, nameWS: 'Planilha' };
      worksheetsXML += format(tmplWorksheetXML, ctx);
    }

    ctx = { created: (new Date()).getTime(), worksheets: worksheetsXML };
    workbookXML = format(tmplWorkbookXML, ctx);

    const link = document.createElement('a');
    link.href = uri + base64({ s: workbookXML });
    link.download = wbname || 'Workbook.xls';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
})();


export function getValueField(value: any, field: string) {
  if (_isNullOrWhiteSpace(value)) {
    return '';
  }

  if (_isNullOrWhiteSpace(field)) {
    return value;
  }
  const divisor = field.split(';');

  if (divisor.length > 1) {
    let retorno: string = '';
    divisor.forEach((elementPrincipal) => {
      try {
        const fields = (elementPrincipal as string).split('.');
        if (fields.length > 1) {
          let novoItem = value;
          fields.forEach((element) => {
            novoItem = novoItem[element];
          });
          retorno = retorno + getEspaco(retorno) + novoItem.toString();
        } else {
          retorno =
            retorno +
            getEspaco(retorno) +
            (elementPrincipal
              ? value[elementPrincipal].toString()
              : value.toString());
        }
      } catch (error) {

      }

    });
    return retorno;
  } else {
    const fields = ((field
      ? field
      : value.toString()) as string).split('.');
    if (fields.length > 1) {
      let novoItem = value;
      fields.forEach((element) => {
        novoItem = novoItem[element];
      });
      return novoItem.toString();
    }
    return field ? value[field] : value.toString();
  }
}



export function getValueField2(value: any, field: string) {
  if (_isNullOrWhiteSpace(value)) {
    return '';
  }

  if (_isNullOrWhiteSpace(field)) {
    return value;
  }
  const divisor = field.split(';');

  let retorno = '';
  try {
    if (divisor.length > 1) {
      divisor.forEach(element => {
        const fields = (element as string).split('.');
        retorno += getEspaco(retorno) + value[element];
      });
    } else {
      retorno += getEspaco(retorno) + value[field];
    }


  } catch (error) {

  }
  return retorno;

}


export function getEspaco(value: string): string {
  return _isNullOrWhiteSpace(value) ? '' : ' - ';
}

export function getIds(value: [], field: string = 'id') {
  const retorno = [];
  value.forEach(element => {
    retorno.push(element);
  });

  return retorno;
}
export function toDateNoTime(value: string) {
  return moment(value, 'DD/MM/YYYY').toDate();
}
export function agruparOfMonth(list: Array<any>, fieldGrouping: string, fieldsValue: Array<string>): Array<any> {
  if (_isNullOrWhiteSpace(list) || _isNullOrWhiteSpace(fieldGrouping) || _isNullOrWhiteSpace(fieldsValue)) {
    return null;
  }

  const listAgrupada = [];
  list.forEach(element => {
    const dataValue = toDateNoTime(element[fieldGrouping]);
    const fieldValue = monthNumericToLiteral((dataValue.getMonth() + 1).toString()) + '/' + dataValue.getFullYear();
    let achou = false;
    listAgrupada.forEach(
      element2 => {
        const fieldAtual = element2[fieldGrouping];

        if (fieldAtual === fieldValue) {
          achou = true;

          fieldsValue.forEach(
            fieldElement => {
              element2[fieldElement] += element[fieldElement];
            }
          );
        }
      }
    );

    if (!achou) {
      const newValue = {};
      newValue[fieldGrouping] = fieldValue;
      fieldsValue.forEach(
        fieldElement => {
          newValue[fieldElement] = element[fieldElement];
        }
      );

      listAgrupada.push(newValue);
    }
  });

  return listAgrupada;
}

export function agruparFullMonth(list: Array<any>, ...args: string[]): Array<any> {
  if (_isNullOrWhiteSpace(list) || _isNullOrWhiteSpace(args) || _isNullOrWhiteSpace(args)) {
    return null;
  }

  const listAgrupada = [];
  list.forEach(element => {

    args.forEach(element2 => {
      const itens = element2.split(':');
      const dataValue = toDateNoTime(element[itens[0]]);
      const fieldValue = monthNumericToLiteral((dataValue.getMonth() + 1).toString()) + '/' + dataValue.getFullYear();
      let achou = false;
      listAgrupada.forEach(
        element3 => {
          const fieldAtual = element3[itens[0]];

          if (fieldAtual === fieldValue) {
            achou = true;

            itens[0].split(';').forEach(
              fieldElement => {
                element3[fieldElement] += element[fieldElement];
              }
            );
          }
        }
      );

      if (!achou) {
        const newValue = {};
        newValue[itens[0]] = fieldValue;
        itens[0].split(';').forEach(
          fieldElement => {
            newValue[fieldElement] = element[fieldElement];
          }
        );

        listAgrupada.push(newValue);
      }

    });



  });

  return listAgrupada;
}

export function monthNumericToLiteral(month: string): string {
  let value = 'sem mês';
  if (_isNullOrWhiteSpace(month)) {
    return value;
  }

  switch (month) {
    case '1': value = 'Janeiro'; break;
    case '2': value = 'Fevereiro'; break;
    case '3': value = 'Março'; break;
    case '4': value = 'Abril'; break;
    case '5': value = 'Maio'; break;
    case '6': value = 'Junho'; break;
    case '7': value = 'Julho'; break;
    case '8': value = 'Agosto'; break;
    case '9': value = 'Setembro'; break;
    case '10': value = 'Outubro'; break;
    case '11': value = 'Novenbro'; break;
    case '12': value = 'Dezembro'; break;
  }

  return value;
}

export function converterTree(value: any, nome: string, itens: []) {
  const children = [];
  itens.forEach((element, index) => {
    const divisor = (element as any).split(':');
    const data = { label: '', expanded: true, children: [] };

    if (index === itens.length) {
      data.label = getValueField(value[element[0]], element[1]);
    } else {

      data.label = getValueField(value[element[0]], element[1]);
    }

  });
}

export function getChildTree(value: any, itens: Array<any>, index: number = 0) {
  const children = [];
  const divisor = (itens[index] as any).split(':');
  if (Array.isArray(value[divisor[0]])) {
    value[divisor[0]].forEach(element => {
      const data = { label: '', styleClass: 'background-color: aqua;', expanded: true, children: [] };
      if ((index + 1) === itens.length) {
        data.label = getValueField(element, divisor[1]);

      } else {
        data.label = getValueField(element, divisor[1]);
        data.children = getChildTree(element, itens, index + 1);
      }

      try {
        if (!_isNullOrWhiteSpace(divisor[2])) {
          data['type'] = divisor[2];
        }
      } catch (error) {

      }

      try {
        if (!_isNullOrWhiteSpace(divisor[3])) {
          data['color'] = basicColorCompare(element[divisor[3]], element[divisor[4]]);
        }
      } catch (error) {

      }
      children.push(data);
    });
  } else {
    const data = { label: '', expanded: true, children: [] };
    if ((index + 1) === itens.length) {
      data.label = getValueField(value[divisor[0]], divisor[1]);

    } else {
      data.label = getValueField(value[divisor[0]], divisor[1]);
      data.children = getChildTree(value[divisor[0]], itens, index + 1);
    }

    try {
      if (!_isNullOrWhiteSpace(divisor[2])) {
        data['type'] = divisor[2];
      }
    } catch (error) {

    }

    try {
      if (!_isNullOrWhiteSpace(divisor[3])) {
        data['color'] = basicColorCompare(value[divisor[3]], value[divisor[4]]);
      }
    } catch (error) {

    }
    children.push(data);
  }
  return children;
}

export function basicColorCompare(value: number, value2: number) {
  if (value && value2) {
    return value > value2 ? 'green' : 'red';
  } else {
    return '';
  }

}

export function toMoney(value: any, currencyPipe): string {
  console.log(currencyPipe.transform(value, 'BRL', true).replace('R$', '').replace(' ', ''));
  return value ? currencyPipe.transform(value, 'BRL', true).replace('R$', '').replace(' ', '') : '';
}


export function toMoneyInput(value: number, currencyPipe): string {

  return toMoney(value, currencyPipe).split('.').join('ç').split(',').join('.').split('ç').join(',');//   .replace(',', '.').replace('ç', ',');
}
export function converteToBase64Depois(readerEvt) {
  const binaryString = readerEvt.target.result;
  return binaryString;
}

export function getImagens(value: Array<any>) {

  if (!value || value.length === 0) {
    return;
  }
  const lista: Array<any> = [];
  value.forEach(element => {
    const valor = element as any;
    if (!valor.foto && !valor.url) {
      return;
    }
    if (!_isNullOrWhiteSpace(valor.foto)) {
      lista.push({ value: 'data:image/jpeg;base64,' + valor.foto, numero: (lista.length + 1).toString() });
    } else {
      if (!_isNullOrWhiteSpace(valor.url)) {
        lista.push({ value: valor.url, numero: (lista.length + 1).toString() });
      }
    }
  });

  return lista;
}




export function formatS(date: Date) {
  /*
          let time = date.getTime().toString();
          let dia = date.getDate().toString().split('-');
          let s = dia[0] + '/' + dia[1] + '/' + dia[2] + ' ' + time.substring(0, 8); */

  const teste = moment(date).format('DD/MM/YYYY HH:mm');
  return teste as any;
}

export function formateDataNoTime(date: Date): string {
  const teste = moment(date).format('DD/MM/YYYY');
  return (teste as any).toString();
}
export function toDate(value: string) {
  return moment(value, 'DD/MM/YYYY HH:mm').toDate();
}


export function dateNoFormat(value: string) {
  return formateDataNoTime(moment(value, 'YYYYMMDD').toDate());
}

export function toMoment(value: string) {
  return moment(value, 'DD/MM/YYYY HH:mm');
}

export function nowString() {
  return formatS(new Date());
}



export function nowStringNoTime() {
  return formateDataNoTime(new Date());
}

export function isValidDate(data: string): boolean {
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

export function isValidDateHora(data: string): boolean {
  try {
    const dataHora = data.split(' ');

    if (_isNullOrWhiteSpace(dataHora)) {
      return false;
    }

    if (!isValidDate(dataHora[0])) {
      return false;
    }

    const horaMinuto = dataHora[1].split(':');
    if (_isNullOrWhiteSpace(horaMinuto)) {
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

