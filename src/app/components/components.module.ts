import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { FormsModule } from '@angular/forms';
import { ModalImageComponent } from './modal-image/modal-image.component';


@NgModule({
  declarations: [
    IncrementerComponent,
    ModalImageComponent,
  ],
  exports: [
    IncrementerComponent,
    ModalImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class ComponentsModule { }
