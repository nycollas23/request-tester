import { Injectable, EventEmitter } from '@angular/core';
import { ResponseModel } from '../models/response.model';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {

  private eventsEmmiter = new Array<EventEmitter<ResponseModel>>();
  private servicesResponse = new Array<any>();
  private isActived = new Array<boolean>();
  private activedEmitter = new EventEmitter<Array<boolean>>();

  constructor(
    private httpService: HttpService
  ) { }

  createServices(requestServices: number, timeRequestMS: number, url: string): void {
    for (let index = 0; index < requestServices; index++) {
      this.eventsEmmiter[index] = new EventEmitter<ResponseModel>();
      this.isActived[index] = true;
      this.startServices(index, timeRequestMS, url);
    }

    this.activedEmitter.emit(this.isActived);

  }

  private startServices(index: number, interval: number, url: string): void {

    

    this.servicesResponse[index] = setInterval(() => {

      if (this.isActived[index]) {
        const timeResponseInit = new Date();

        this.httpService.getHttpService(url)
          .pipe(
            take(1)
          )
          .subscribe((response: ResponseModel) => {
            response.timeResponse = new Date().getTime() - timeResponseInit.getTime();
            this.eventsEmmiter[index].emit(response);
          });

      }

    }, interval);

  }

  getListenerService(index: number): Observable<ResponseModel> {
    return this.eventsEmmiter[index].asObservable();
  }

  getActivedServices(): Observable<Array<boolean>> {
    return this.activedEmitter.asObservable();
  }

  stopContinueServices(index: number): void {
    this.isActived[index] = !this.isActived[index];
    this.activedEmitter.emit(this.isActived);
  }

  stopAllServices(): void {

    this.servicesResponse.forEach((value, index) => {
      clearInterval(this.servicesResponse[index]);
    });

    this.resetAll();

  }

  private resetAll(): void {
    this.eventsEmmiter = new Array<EventEmitter<ResponseModel>>();
    this.servicesResponse = new Array<any>();
    this.isActived = new Array<boolean>();
  }

}
