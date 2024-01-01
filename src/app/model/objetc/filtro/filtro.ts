import { Pesquisa } from './pesquisa';
export class Filtro {
    sql: string;
    orderBy: string;
	groupBy: string;
    limite: string;
    nativo: boolean = false;
    pesquisas: Array<Pesquisa>;
}
