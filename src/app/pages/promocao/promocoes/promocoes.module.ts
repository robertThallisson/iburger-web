import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PromocoesPageRoutingModule } from './promocoes-routing.module';

import { PromocoesPage } from './promocoes.page';
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
    PromocoesPageRoutingModule,
    CustomMenuModule,
    TableModule,
    ToolbarModule,
    MBIPipeModule,
    ButtonModule
  ],
  declarations: [PromocoesPage]
})
export class PromocoesPageModule {}
