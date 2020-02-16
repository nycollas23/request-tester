import { Component, OnInit, Input } from '@angular/core';
import { ResponseModel } from '../shared/models/response.model';
import { RequestServiceService } from '../shared/services/request-service.service';
import { Observable, Subscription } from 'rxjs';

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

  @Input()
  activedRequests: boolean;

  private logs = new Array<ResponseModel>();
  private timerNumber: number;
  private timerInteval;

  activedServices = new Array<boolean>();

  private subs = new Subscription();

  initService = false;

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
    this.listenActivedServices();
    this.requestServiceService.createServices(this.requestServices, this.timeRequestMS, this.url);
    this.startListener();
    this.timerStatusInit();
    this.initService = true;
  }

  startListener(): void {

    this.logs = new Array<ResponseModel>();

    for (let index = 0; index < this.requestServices; index++) {
      this.logs.push({
        hashService: '',
        timeResponse: 0
      });

      this.subs.add(
        this.requestServiceService.getListenerService(index).subscribe((responseService: ResponseModel) => {
          this.logs[index] = responseService;
        })
      );
    }
  }

  pauseContinueService(index: number): void {
    this.requestServiceService.stopContinueServices(index);
  }

  stopServices(): void {
    this.initService = false;
    this.subs.unsubscribe();
    this.requestServiceService.stopAllServices();
    clearInterval(this.timerInteval);
  }

  listenActivedServices(): void {
    this.subs.add(
      this.requestServiceService.getActivedServices().subscribe((response: Array<boolean>) => {
        this.activedServices = response;
      })
    );
  }

}
