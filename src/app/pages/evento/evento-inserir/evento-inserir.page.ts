import { Component, OnInit } from '@angular/core';
import { Evento } from '../../../model/objetc/evento';
import { BaseInserir } from '../../../model/telas/base-inserir';
import { Base } from '../../../model/base';
import { EventoService } from '../../../service/pop-farma/evento.service';
import { PhotoService } from '../../../services/photo.service';

@Component({
  selector: 'app-evento-inserir',
  templateUrl: './evento-inserir.page.html',
  styleUrls: ['./evento-inserir.page.scss'],
})
export class EventoInserirPage extends BaseInserir<Evento> implements OnInit {

  constructor(
    public base: Base,
    public service: EventoService,
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
   // throw new Error('Method not implemented.');
  }



}
