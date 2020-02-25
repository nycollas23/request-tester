import { Injectable, EventEmitter } from '@angular/core';
import { ResponseModel } from '../models/response.model';
import { HttpService } from './http.service';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ServicePod } from '../models/service-pod.model';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {

  private subscriptions = new Subscription();
  private responseChangePod = new EventEmitter<ServicePod>();

  constructor(
    private httpService: HttpService
  ) { }

  createServices(requestServices: number, timeRequestMS: number, url: string, countLoops: number): Array<ServicePod> {
    const servicesPods = new Array<ServicePod>();

    for (let index = 0; index < requestServices; index++) {
      const newPod = new ServicePod(this.httpService);
      newPod.createPod(url, (timeRequestMS * 1000), countLoops);
      servicesPods.push(newPod);
      this.createListenerPod(newPod);
    }

    return servicesPods;

  }

  createListenerPod(pod: ServicePod): void {
    this.subscriptions.add(
      pod.eventEmitter.subscribe((podChanged: ServicePod) => {
        console.log('HOUVE MUDANÇA NO POD ' + podChanged.hashName);
        this.responseChangePod.emit(podChanged);
      })
    );
  }

}
