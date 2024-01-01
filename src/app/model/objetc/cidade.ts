import { Pessoa } from './pessoa';
import { Estado } from './estado';
export class Cidade {
    id: number;
    nome: string;
    estado: Estado;
    ibge: number;
    latLon: any;
    latitude: number;
    longitude: number;
    codTom: number;
    geolocation: string;
    postalCode: string;
}
