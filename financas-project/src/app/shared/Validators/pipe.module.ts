import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaxDescribeLenghtPipe } from './max-describe-lenght.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [MaxDescribeLenghtPipe],
  declarations: [
    MaxDescribeLenghtPipe
  ],
  providers: [],
})
export class PipeModule { }
