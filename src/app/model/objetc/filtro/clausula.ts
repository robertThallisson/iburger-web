export class Clausula {
    descricao: string;
    component: string;

    value: any;
    value2: any;
    fieldValue: string;
    fieldame: string = 'nome';
    name: string;
    name2: string;

    nome: string;
    comparacao: string;
    inteiro: boolean;
    addHora: boolean;

    service: any;

    isNullCompare: boolean = false;
    getValue(anyValue?: any, isValue2?: boolean  ): any {
        if (anyValue=== null || anyValue === undefined) {
            anyValue = this.value;
        } 
        if (this.fieldValue === null || this.fieldValue === undefined) {
            let value = anyValue;
            switch (this.component) {
                case 'selected': value = value ; break;
                case 'text': value = '\'' + anyValue.toUpperCase() + '\'' ; break;
                case 'number': value = ' ' + anyValue + ' ' ; break;
                case 'data': value = '\'' + anyValue + '\'' ; break;
                case 'between_date': value = '\'' + anyValue + (this.addHora ?   (isValue2 ? ' 23:59:59' : ' 00:00:00')  : '') + '\''   ; break;
                case 'check': value = ( this.isNullCompare ? ( (value ? ' null ' :  ' not null ')  ) :    (  anyValue.toString())) ; break;
                case 'between_number': value = ' ' + anyValue + ' ' ; break;
            }
            return value;
        } else  {
            let value = anyValue[this.fieldValue];
            switch (this.component) {
                case 'selected': value = value ; break;
                case 'text': value = '\'' + anyValue.toUpperCase() + '\'' ; break;
                case 'number': value = ' ' + anyValue + ' ' ; break;
                case 'data': value = '\'' + anyValue + '\'' ; break;
                case 'between_date': value = '\'' + anyValue + (this.addHora ?   (isValue2 ? ' 23:59:59' : ' 00:00:00')  : '') + +  '\'' ; break;
                case 'check': value = ( this.isNullCompare ? ( (value ? ' null ' :  ' not null ')  ) :    (  anyValue.toString())) ; break;
                case 'between_number': value = ' ' + anyValue + ' ' ; break;
            }
            return value;
        }
    }

    getValue2(): any {
        return this.getValue(this.value2, true);
    }
}

export class GridMenu {
    list: Array<Clausula> = new Array<Clausula>();
    linha: number;
}
