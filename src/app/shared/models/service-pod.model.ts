import { EventEmitter } from '@angular/core';
import { ResponseModel } from './response.model';
import { HttpService } from '../services/http.service';
import { take } from 'rxjs/operators';

export class ServicePod {
    private intervalFunction;
    eventEmitter: EventEmitter<ResponseModel>;
    isActived: boolean;

    constructor(
        private httpService: HttpService
    ) {

    }

    createInterval = (url: string, interval = 1000) => {
        this.intervalFunction = setInterval(() => {

            if (this.isActived) {
                const timeResponseInit = new Date();

                this.httpService.getHttpService(url)
                    .pipe(
                        take(1)
                    )
                    .subscribe((response: ResponseModel) => {
                        response.timeResponse = new Date().getTime() - timeResponseInit.getTime();
                        this.eventEmitter.emit(response);
                    });

            }

        }, interval);
    }

}
