import { Component, OnInit } from '@angular/core';
import { Destaque } from '../../../model/objetc/destaque';
import { DestaqueService } from '../../../service/pop-farma/destaque.service';
import { Base } from '../../../model/base';
import { BaseInserir } from '../../../model/telas/base-inserir';
import { PhotoService } from '../../../services/photo.service';
@Component({
  selector: 'app-destaque-inserir',
  templateUrl: './destaque-inserir.page.html',
  styleUrls: ['./destaque-inserir.page.scss'],
})
export class DestaqueInserirPage extends BaseInserir<Destaque> implements OnInit {

  constructor(
    public base: Base,
    public service: DestaqueService,
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
  afterLoader(): void {
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
}
