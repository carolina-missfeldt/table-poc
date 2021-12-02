import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { StateSelectComponent } from './state-select/state-select.component'
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [StateSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [
    StateSelectComponent,
    MatButtonModule,
    MatInputModule
  ]
})
export class SharedModule { }
