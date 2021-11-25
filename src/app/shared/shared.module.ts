import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { StateSelectComponent } from './state-select/state-select.component'
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [StateSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule
  ],
  exports: [
    MatSelectModule,
    StateSelectComponent
  ]
})
export class SharedModule { }
