import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IncrementerComponent,
  ],
  exports: [
    IncrementerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class ComponentsModule { }
