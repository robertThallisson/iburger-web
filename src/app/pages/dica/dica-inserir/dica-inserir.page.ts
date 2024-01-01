import { Component, OnInit } from '@angular/core';
import { Dica } from '../../../model/objetc/dica';
import { DicaService } from '../../../service/pop-farma/dica.service';
import { Base } from '../../../model/base';
import { BaseInserir } from '../../../model/telas/base-inserir';
import { PhotoService } from '../../../services/photo.service';
@Component({
  selector: 'app-dica-inserir',
  templateUrl: './dica-inserir.page.html',
  styleUrls: ['./dica-inserir.page.scss'],
})
export class DicaInserirPage extends BaseInserir<Dica> implements OnInit {
  constructor(
    public base: Base,
    public service: DicaService,
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
  }
}
