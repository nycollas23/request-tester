import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msCheck'
})
export class MsCheckPipe implements PipeTransform {

  transform(value: number): any {
    let cssClass = 'light-status ';
    if (value >= 50) {
      cssClass += 'ms-check-red';
    } else if (value > 30 && value < 50) {
      cssClass += 'ms-check-yellow';
    } else if (value > 0 && value <= 30) {
      cssClass += 'ms-check-green';
    } else {
      cssClass += 'ms-check-gray';
    }

    return cssClass;

  }

}
