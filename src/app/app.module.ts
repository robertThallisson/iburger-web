import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { CustomListModalPage } from './components/custom-list-modal/custom-list-modal.page';
import { PesquisarItemPage } from './components/pesquisar-item/pesquisar-item.page';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PhotoService } from './services/photo.service';
import { MBIPipe } from './pipes/mbi.pipe';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@NgModule({
  declarations: [
    AppComponent,
    NotificationsComponent,
    CustomListModalPage,
    PesquisarItemPage
  ],
  entryComponents: [
    NotificationsComponent,
    CustomListModalPage,
    PesquisarItemPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ConfirmDialogModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MessageService,
    ConfirmationService,
    CurrencyPipe,
    PhotoService,
    MBIPipe,
    LocalNotifications,
    AndroidPermissions
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
