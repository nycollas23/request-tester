import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServicePod } from '../shared/models/service-pod.model';
import { PodStatus } from '../shared/enum/pod-status.enum';
import { StatusTimeSettings } from '../shared/models/status-time-settings.model';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  @Input()
  private pods = new Array<ServicePod>();

  @Input()
  private separateTimes = new StatusTimeSettings();

  @Output()
  private podsChange = new EventEmitter<Array<ServicePod>>();

  @Input()
  pieChartData = new Array<number>(4);

  readonly ATIVO = PodStatus.ATIVO;
  readonly DESATIVADO = PodStatus.DESATIVADO;
  readonly ERROR = PodStatus.ERROR;
  readonly FINALIZADO = PodStatus.FINALIZADO;

  constructor( ) { }

  ngOnInit() {

  }

  pauseContinueService(pod: ServicePod): void {
    pod.pauseOrContinuePod();
    this.podsChange.emit(this.pods);
  }

  killPod(pod: ServicePod): void {
    pod.killPod();
    this.pods.splice(
      this.pods.findIndex((podFind) => podFind.hashName === pod.hashName),
      1
    );
    this.podsChange.emit(this.pods);
  }

  checkTimeIcon(responseTime: number): string {

    if (responseTime >= this.separateTimes.bestTimeRangeMinimum && responseTime <= this.separateTimes.bestTimeRangeMaximum) {
      return 'ms-check-green';
    } else if (responseTime > this.separateTimes.bestTimeRangeMaximum && responseTime <= this.separateTimes.mediumTimeRangeMaximum)  {
      return 'ms-check-yellow';
    }

    if (this.separateTimes.badTimeRangeMaximum && responseTime > this.separateTimes.bestTimeRangeMaximum) {
      return 'ms-check-black';
    } else {
      return 'ms-check-red';
    }

  }

}
