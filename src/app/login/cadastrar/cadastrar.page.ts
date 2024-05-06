/* eslint-disable no-var */
/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable id-blacklist */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { AutentificacaoService } from '../../service/autentificacao/autentificacao.service';
import { Router } from '@angular/router';
import { BaseInserir } from '../../model/telas/base-inserir';
import { Base } from '../../model/base';
import { Usuario } from '../../model/objetc/usuario';
import { UsuarioService } from '../../service/pop-farma/usuario.service';
import { NgForm } from '@angular/forms';
import { Pessoa } from '../../model/objetc/pessoa';
import { Endereco } from '../../model/objetc/endereco';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { CidadeService } from '../../service/pop-farma/cidade.service';
import { Cidade } from '../../model/objetc/cidade';
import { Platform } from '@ionic/angular';
import { EmpresaService } from '../../service/pop-farma/empresa.service';
import { _isNullOrWhiteSpace } from '../../funcoes/funcoes';
import { Empresa } from '../../model/objetc/empresa';
import { Token } from 'src/app/model/seguranca/token';

declare var google;

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage extends BaseInserir<Usuario> implements OnInit {
  afterLoader(): void {
    //throw new Error('Method not implemented.');
  }

  isLoading: boolean = false;


  selectedIndex = 0;
  cep: string;

  teste: NativeGeocoderResult = {} as any;
  endereco: Endereco = new Endereco();


  map: any;

  tipoUsuario  = 0;
  constructor(
    private autentificacaoService: AutentificacaoService,
    private router: Router,
    public base: Base,
    public usuarioService: UsuarioService,
    private nativeGeocoder: NativeGeocoder,
    private cidadeService: CidadeService,
    public platform: Platform,
    private empresaService: EmpresaService
  ) {
    super(base, usuarioService);
    this.value.pessoa = new Pessoa();
    this.value.pessoa.enderecos = [];
    this.value.pessoa.enderecos.push(this.endereco);
  }

  consultaCEP() {
    this.base.consultaCEP(this.cep, this.carregar.bind(this));
  }

  carregar(value: any) {
      this.cidadeService.pesquisarByIbge(Number(value.ibge)).subscribe(
        data => {
          this.value.pessoa.cidade = data as Cidade;
        },
        error => {
          this.base.mensagemErro('Cep não encontrado');
        }

      );

  }

  ngOnInit() {
    this.base.present();
    try {
      this.autentificacaoService.getNewTokenRegisto().subscribe(
        data => {
          this.autentificacaoService.token = data;
          this.base.dismiss();
        },
        error => {
          this.base.dismiss();
          this.base.mensagemErro('Falha ao obter token de acesso', error);
        }
      );
    } catch (error) {
      this.base.dismiss();
      this.base.mensagemErro('Erro', error);
    }
  }
  /*
  lat;
  long;
  public getGeoLocation(){
    if (navigator.geolocation) {
        var options = {
          enableHighAccuracy: true
        };

        navigator.geolocation.getCurrentPosition(position=> {
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          let geocoder = new google.maps.Geocoder();
          let latlng = new google.maps.LatLng(this.lat, this.long);
          let request = {
            latLng: latlng
          };

            geocoder.geocode(request, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[0] != null) {
                 let city = results[0].address_components[results[0].address_components.length-4].short_name;

                 this.shareService.setLocationDetails(city);


                } else {
                  alert("No address available");
                }
              }
            });

        }, error => {
          console.log(error);
        }, options);
    }
  }
*/
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.nextStep();

 ////   if (
   //   this.platform.is('android') || this.platform.is('capacitor') || this.platform.is('ios') ||
  //    this.platform.is('ipad') || this.platform.is('iphone') || this.platform.is('tablet')
  //    ) {
        const printCurrentPosition = async () => {
          const coordinates = await Geolocation.getCurrentPosition().then(
            data => {
              console.log(data);
              const options: NativeGeocoderOptions = {
                useLocale: true,
                maxResults: 5
              };

              //chave google
              //AIzaSyAfBqnc79HDFzUWF4uDaw4C1PzP1v5YRvc


              const aposition = new google.maps.LatLng(-21.763409, -43.349034);

              const mapOptions = {
                zoom: 18,
                center: aposition,
              };

              this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

              console.log(this.map);

              const marker = new google.maps.Marker({
                position: aposition,
                map: this.map,
              });

              console.log(marker);

              this.nativeGeocoder.reverseGeocode(data.coords.latitude, data.coords.longitude, options).then(
                result => {
                  console.log(result);
                  this.teste = result[0];
                  if (result.length > 0) {

                    this.endereco.rua = result[0].thoroughfare;
                    this.endereco.bairro = result[0].subLocality;
                    this.endereco.numero = result[0].subThoroughfare;
                    this.endereco.rua = result[0].thoroughfare;
                    this.endereco.rua = result[0].thoroughfare;
                    this.endereco.rua = result[0].thoroughfare;

                  } else {
                  }
                },
                error => {
                  console.log(error);
                }
              );

            }, error => {
              console.log(error);
            }
          );

          console.log('Current position:', coordinates);
        };
        printCurrentPosition();

   // }


    //this.consultaCEP();

  }

  nextStep() {
    if (this.selectedIndex < 2) {
      this.selectedIndex = this.selectedIndex + 1;
    }
    console.log(this.selectedIndex);
  }

  previousStep() {
    if (this.selectedIndex > 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
    console.log(this.selectedIndex);
  }

  mudouTab(event: any) {
    this.selectedIndex = event;
  }


  retorno(id?: string): void {
    const empresa: Empresa = new Empresa();

    empresa.pessoa = this.value.pessoa;
    if (this.value.temEmpresa) {
      if (!this.validar()) {
        return;
      }

      this.base.present();
      try {
        this.beforeSave();
        this.service.salvar(this.value).subscribe(
          data => {
            this.base.menssagemSucesso('Registro salvo com sucesso ' + data[id]);
            this.afterSave();
            this.base.dismiss();
          },
          error => {
            this.base.dismiss();

            this.base.mensagemErro('Erro ao salvar \n' + this.base.tratarErro(error));
          }
        );
      } catch (error) {
        this.base.dismiss();
        if (_isNullOrWhiteSpace(this.service)) {
          this.base.mensagemErro('Erro service não declarado');
        } else {
          this.base.mensagemErro('Erro service não declarado', error);
        }

      }


    } else {
      super.salvar(id);
    }

  }

  newRegistro() {
    this.base.as.getNewTokenRegisto().subscribe(
      data => {
        this.autentificacaoService.token = data as Token;
        this.salvar();
      },
      erro => {
        this.base.mensagemErro('Erro ao tentar obter token de registro');
      }
    ); ;
  }

  comEmpresa() {
    this.value.temEmpresa = true;
    this.nextStep();
  }

  semEmpresa() {
    this.value.temEmpresa = false;
    this.nextStep();
  }
  afterSave(): void {
    this.autentificacaoService.token = null;
    this.router.navigate(['']);
  }
  beforeSave(): void {
    this.value.pessoa.enderecos[0].principal = true;
  }


}

