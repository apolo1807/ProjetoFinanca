import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValoresComponent } from './valores.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
    ],
  exports: [ValoresComponent],
  declarations: [ValoresComponent],
  providers: [],
})
export class ValoresModule { }
