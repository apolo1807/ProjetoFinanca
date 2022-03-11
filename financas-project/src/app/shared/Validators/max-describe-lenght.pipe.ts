import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxDescribeLenght'
})
export class MaxDescribeLenghtPipe implements PipeTransform {

  transform(descricao: string): any {

    if(descricao.length > 20) {
      return descricao.slice(0, -descricao.length.toFixed() + 40).concat('...');
    }

    return descricao;
  }
}
