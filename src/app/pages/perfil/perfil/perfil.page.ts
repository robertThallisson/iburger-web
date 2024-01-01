import { Component, OnInit } from '@angular/core';
import { BaseInserir } from '../../../model/telas/base-inserir';
import { Usuario } from '../../../model/objetc/usuario';
import { Base } from '../../../model/base';
import { UsuarioService } from '../../../service/pop-farma/usuario.service';
import { PhotoService } from '../../../services/photo.service';
import { _isNullOrWhiteSpace } from '../../../funcoes/funcoes';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage extends BaseInserir<Usuario> implements OnInit {


  constructor(
    public base: Base,
    public usuarioService: UsuarioService,
    public photoService: PhotoService,
  ) {
    usuarioService.value = usuarioService.as.token.usuario;
    super(base, usuarioService);
    this.noCleanAfterSave = true;
  }
  ngOnInit(): void {

  }

  beforeSave(): void {

  }
  afterSave(): void {

  }


  converteToBase64Depois(readerEvt) {
    let binaryString = readerEvt.target.result;

    binaryString = binaryString.replace('data:image/png;base64,','');
    binaryString = binaryString.replace('data:image/jpeg;base64,','');
    binaryString = binaryString.replace('data:image/jpg;base64,','');
    this.value.pessoa.foto = binaryString;
  }

  onFileSelected(event: any) {
    console.log(event);
    const files = event.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.onload = this.converteToBase64Depois.bind(this);

      reader.readAsDataURL (file);
    }
  }

  async  tirarFoto() {
    await this.photoService.addNewToGallery();

    this.value.pessoa.foto = this.photoService.lastBase64;
  }


  getImagem() {
    try {
      return !_isNullOrWhiteSpace(this.value.pessoa.url) ?
        this.value.pessoa.url : '/assets/img/user.png';
    } catch (error) {
      return '/assets/img/user.png';
    }
  }
}
