import { EmpresaService } from './../../../service/pop-farma/empresa.service';
import { Component, OnInit } from '@angular/core';
import { Banner } from '../../../model/objetc/banner';
import { Base } from '../../../model/base';
import { BaseInserir } from '../../../model/telas/base-inserir';
import { BannerService } from '../../../service/pop-farma/banner.service';
import { getImagens } from 'src/app/funcoes/funcoes';
import { PhotoService } from '../../../services/photo.service';

@Component({
  selector: 'app-banner-inserir',
  templateUrl: './banner-inserir.page.html',
  styleUrls: ['./banner-inserir.page.scss'],
})
export class BannerInserirPage extends BaseInserir<Banner> implements OnInit {

  constructor(
    public base: Base,
    public service: BannerService,
    public empresaService: EmpresaService,
    public photoService: PhotoService
  ) {
    super(base, service);
   }

  ngOnInit() {}

  beforeSave(): void {
    this.value.usuario = this.service.as.token.usuario;
  }
  afterSave(): void {

  }


  onFileSelected(event: any) {
    console.log(event);
    const files = event.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.onload = this.converteToBase64Depois.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  converteToBase64Depois(readerEvt) {
    const binaryString = readerEvt.target.result;

    this.value.imagem = btoa(binaryString);


  }

  async  tirarFoto() {
    await this.photoService.addNewToGallery();

    this.value.imagem = this.photoService.lastBase64;
  }
  afterLoader(): void {
    //throw new Error('Method not implemented.');
  }
}
