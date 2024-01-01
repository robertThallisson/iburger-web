import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirEnderecoComponent } from './inserir-endereco.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputMbiModule } from '../../../../components/input/input-mbi/input-mbi.module';
import { SearchSelectableModule } from '../../../../components/search-selectable/search-selectable.module';



@NgModule({
  declarations: [
    InserirEnderecoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputMbiModule,
    SearchSelectableModule
  ],
  exports: [
    InserirEnderecoComponent
  ],
  entryComponents: [
    InserirEnderecoComponent
  ]
})
export class InserirEnderecoModule { }
