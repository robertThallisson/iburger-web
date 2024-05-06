/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
import { Empresa } from './../../model/objetc/empresa';
import { Token } from './../../model/seguranca/token';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AutentificacaoService {
  //public url: string = 'http://192.168.17.1:8080';
  public url: string = 'http://192.168.3.11:8080';
  //public url: string = 'http://191.242.17.2:8080';
  //public url: string = 'https://appfarmanciafacil.tech:8080';
  //public url: string = 'https://app-farmacia-facil.herokuapp.com';
  //public url: string = 'http://177.75.52.122:8080'; // martins rodrigues ip
  urlToken: string = '/oauth/token';
  token: Token;
  deveAtualizarSenha: boolean = false;
  tokenDecode: any;
  //mobile
  constructor(private http: HttpClient) { }

  getNewTokenRegisto() {
    return this.http.post<Token>(this.url + this.urlToken, this.getBodyToken('cadastrar', 'farmacia-facil'),
      this.getOptionsToken());
  }

  gravarSessao(empresa: Empresa) {
    return this.http.post(this.url + '/empresas/gravarsessao', empresa, this.getOptions());
  }

  public getHeaderToken() {
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic YW5ndWxhcjphbmd1bGFy'
    });
  }

  public getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token.token_type + ' ' + this.token.access_token
    });
  }

  public getHeaderDelete() {
    return new HttpHeaders({
      'Content-Type': 'text/plain',
      'Authorization': this.token.token_type + ' ' + this.token.access_token
    });
  }

  public getHeaderPDF() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      //Accept: 'application/pdf',
      'Authorization': this.token.token_type + ' ' + this.token.access_token
    });
  }

  public getOptionsToken() {
    const httpOptions = {
      headers: this.getHeaderToken()
    };
    return httpOptions;
  }

  public getOptions() {
    const httpOptions = {
      headers: this.getHeader()
    };
    return httpOptions;
  }

  public getOptionsDelete() {
    const httpOptions = {
      headers: this.getHeaderDelete()
    };
    return httpOptions;
  }

  public getOptionsPDF() {
    const httpOptions = {
      headers: this.getHeaderPDF(),
      responseType: 'blob' as 'json'
    };
    return httpOptions;
  }

  public getBodyToken(user: string, password: string) {
    const data: string = 'client=angular&username=' + user + '&password=' + password + '&grant_type=password&scoper=white';
    return data;
  }


  logout() {
    localStorage.removeItem('token');
    this.token = null;
  }

  getTokenDecode() {
    const helper = new JwtHelperService();

    this.tokenDecode = helper.decodeToken(this.token.access_token);
  }
}
