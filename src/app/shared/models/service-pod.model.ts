import { EventEmitter } from '@angular/core';
import { HttpService } from '../services/http.service';
import { take } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';
import { PodStatus } from '../enum/pod-status.enum';

export class ServicePod {
    private intervalFunction;
    private podStatus: PodStatus;

    hashName: string | Int32Array;
    eventEmitter: EventEmitter<ServicePod>;
    timeResponse: number;

    constructor(
        private httpService: HttpService
    ) {

    }

    createPod = (url: string, interval = 1000) => {

        if (!this.intervalFunction) {
            this.startedValuesPod();

            this.intervalFunction = setInterval(() => {

                if (this.podStatus === PodStatus.ATIVO) {

                    const timeResponseInit = new Date();

                    this.httpService.getHttpService(url)
                        .pipe(
                            take(1)
                        )
                        .subscribe((response) => {
                            console.log('AQUI');
                            this.timeResponse = new Date().getTime() - timeResponseInit.getTime();
                        }, (err) => {
                            this.podStatus = PodStatus.ERROR;
                            this.stopPod();
                        });

                }

            }, interval);
        }

    }

    pauseOrContinuePod(): void {

        if (this.podStatus === PodStatus.ATIVO) {
            this.podStatus = PodStatus.DESATIVADO;
            this.sendChange();
            return;
        }

        if (this.podStatus === PodStatus.DESATIVADO) {
            this.podStatus = PodStatus.ATIVO;
            this.sendChange();
            return;
        }
    }

    getPodStatus(): PodStatus {
        return this.podStatus;
    }

    stopPod(): void {
        this.podStatus = this.podStatus === PodStatus.ATIVO ? PodStatus.DESATIVADO : this.podStatus;
        clearInterval(this.intervalFunction);
        this.sendChange();
    }

    private startedValuesPod(): void {
        this.hashName = Md5.hashStr((Math.random() * 9999).toString());
        this.podStatus = PodStatus.ATIVO;
        this.eventEmitter = new EventEmitter<ServicePod>();
    }

    private sendChange(): void {
        this.eventEmitter.emit(this);
    }

    killPod(): void {
        this.stopPod();
    }

}
