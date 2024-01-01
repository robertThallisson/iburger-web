import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MBIPipe } from './mbi.pipe';

@NgModule({
  declarations: [
    MBIPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MBIPipe
  ]
})
export class MBIPipeModule { }
