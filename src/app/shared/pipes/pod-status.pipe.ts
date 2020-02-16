import { Pipe, PipeTransform } from '@angular/core';
import { PodStatus } from '../enum/pod-status.enum';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'podStatusPipe'
})
export class PodStatusPipe implements PipeTransform {

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  transform(status: PodStatus): SafeHtml {
    let text = '';
    let cssClass = '';

    switch (status) {
      case PodStatus.ATIVO:
        text = 'Ativado';
        cssClass = 'badge badge-pill badge-success';
        break;
      case PodStatus.DESATIVADO:
        text = 'Desativado';
        cssClass = 'badge badge-pill badge-dark';
        break;
      case PodStatus.ERROR:
        text = 'Erro no Pod';
        cssClass = 'badge badge-pill badge-danger';
        break;
    }

    return this.domSanitizer.bypassSecurityTrustHtml(
      `<span class="${cssClass}">${text}</span>`
    );

  }

}
