import { Component, OnInit } from '@angular/core';
import { Promocao } from '../../../model/objetc/promocao';
import { PromocaoService } from '../../../service/pop-farma/promocao.service';
import { Base } from '../../../model/base';
import { BaseInserir } from '../../../model/telas/base-inserir';
import { PhotoService } from '../../../services/photo.service';
@Component({
  selector: 'app-promocao-inserir',
  templateUrl: './promocao-inserir.page.html',
  styleUrls: ['./promocao-inserir.page.scss'],
})
export class PromocaoInserirPage extends BaseInserir<Promocao> implements OnInit {
  constructor(
    public base: Base,
    public service: PromocaoService,
    public photoService: PhotoService
  ) {
    super(base, service);
   }

  ngOnInit() {}


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

  beforeSave(): void {
    this.value.usuario = this.service.as.token.usuario;
  }
  afterSave(): void {

  }
  afterLoader(): void {
  }
}
