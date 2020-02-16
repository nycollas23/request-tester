import { Component, OnInit, Input } from '@angular/core';
import { ResponseModel } from '../shared/models/response.model';
import { RequestServiceService } from '../shared/services/request-service.service';
import { Observable, Subscription } from 'rxjs';
import { ServicePod } from '../shared/models/service-pod.model';
import { PodStatus } from '../shared/enum/pod-status.enum';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  @Input()
  timeRequestMS: number;

  @Input()
  requestServices: number;

  @Input()
  url: string;

  private pods = new Array<ServicePod>();
  private timerNumber: number;
  private timerInteval;

  initService = false;

  readonly ATIVO = PodStatus.ATIVO;
  readonly DESATIVADO = PodStatus.DESATIVADO;

  constructor(
    private requestServiceService: RequestServiceService
  ) { }

  ngOnInit() {

  }

  private timerStatusInit() {

    this.timerNumber = this.timeRequestMS / 1000;

    this.timerInteval = setInterval(() => {
      this.timerNumber--;
      if (this.timerNumber <= 0) {
        this.timerNumber = this.timeRequestMS / 1000;
      }
    }, 1000);

  }

  startServices(): void {

    this.pods = this.requestServiceService.createServices(this.requestServices, this.timeRequestMS, this.url);

    console.log(this.pods);

    this.timerStatusInit();
    this.initService = true;
  }

  pauseContinueService(pod: ServicePod): void {
    pod.pauseOrContinuePod();
  }

  stopServices(): void {
    this.initService = false;
    this.stopAllServices();
    clearInterval(this.timerInteval);
  }

  stopAllServices(): void {
    this.pods.forEach((pod: ServicePod) => {
      pod.stopPod();
    });
  }

  killPod(pod: ServicePod): void {
    pod.killPod();
    this.pods.splice(
      this.pods.findIndex((podFind) => podFind.hashName === pod.hashName),
      1
    );

    if (this.pods.length <= 0) {
      this.stopServices();
    }
  }

}
