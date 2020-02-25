import { Component, OnInit } from '@angular/core';
import { ServicePod } from '../shared/models/service-pod.model';
import { RequestServiceService } from '../shared/services/request-service.service';
import { StatusTimeSettings } from '../shared/models/status-time-settings.model';
import { Steps } from '../shared/enum/steps.enum';

@Component({
  selector: 'app-request-tester',
  templateUrl: './request-tester.component.html',
  styleUrls: ['./request-tester.component.scss']
})
export class RequestTesterComponent implements OnInit {

  actualStep = Steps.CONFIGURAR;
  timeInterval = 5;
  requestServices = 1;
  url = 'http://localhost:3000/jobs/';
  countLoops = 0;
  count = 0;

  pods = new Array<ServicePod>();

  timerNumber: number;
  private intervalTimer;

  private separateTimes = new StatusTimeSettings();

  readonly CONFIGURAR = Steps.CONFIGURAR;
  readonly RODAR = Steps.RODAR;
  readonly RELATORIO = Steps.RELATORIO;

  constructor(
    private requestServiceService: RequestServiceService
  ) { }

  ngOnInit() {
    this.separateTimes.bestTimeRangeMinimum = 0;
    this.separateTimes.bestTimeRangeMaximum = 100;
    this.separateTimes.mediumTimeRangeMaximum = 200;

  }

  startServices(): void {
    this.pods = this.requestServiceService.createServices(this.requestServices, this.timeInterval, this.url, this.countLoops);
    this.timerStatusInit();
    this.actualStep = Steps.RODAR;
  }

  private timerStatusInit() {

    this.timerNumber = this.timeInterval;

    this.intervalTimer = setInterval(() => {
      this.timerNumber--;
      if (this.timerNumber <= 0) {
        this.count++;
        this.timerNumber = this.timeInterval;
      }
    }, 1000);

  }

  stopAllServices(): void {
    this.pods.forEach((pod: ServicePod) => {
      pod.stopPod();
    });

    clearInterval(this.intervalTimer);

  }

  getAverageTime(): number {
    let timeAverage = 0;
    this.pods.forEach((pod: ServicePod) => {
      timeAverage += pod.getAverageTimeResponse();
    });

    return Math.round(timeAverage / this.pods.length);

  }

  viewReport(): void {
    this.actualStep = Steps.RELATORIO;
  }

}
