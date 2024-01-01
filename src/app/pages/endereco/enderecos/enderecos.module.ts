import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnderecosPageRoutingModule } from './enderecos-routing.module';

import { EnderecosPage } from './enderecos.page';
import { CustomMenuModule } from '../../../components/custom-menu/custom-menu.module';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { MBIPipeModule } from '../../../pipes/mbipipe.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnderecosPageRoutingModule,
    CustomMenuModule,
    TableModule,
    ToolbarModule,
    MBIPipeModule,
    ButtonModule
  ],
  declarations: [EnderecosPage]
})
export class EnderecosPageModule {}
