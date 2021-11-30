import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { StateSelectComponent } from './state-select/state-select.component'
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [StateSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
  ],
  exports: [
    StateSelectComponent,
  ]
})
export class SharedModule { }
