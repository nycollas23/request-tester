import { EventEmitter } from '@angular/core';
import { HttpService } from '../services/http.service';
import { take } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';
import { PodStatus } from '../enum/pod-status.enum';
import { ServiceRequestLog } from './service-request-log.model';
import { StatusLog } from '../enum/status-log.enum';

export class ServicePod {
    private intervalFunction;
    private podStatus: PodStatus;
    private countRequestsSuccess = 0;
    private countRequestsFailed = 0;
    private sumAlltimeResponse = 0;
    private requestsLogs = new Array<ServiceRequestLog>();

    private countLoopsRemain = 1;
    private haveLoop = false;

    hashName: string | Int32Array;
    eventEmitter: EventEmitter<ServicePod>;
    timeResponse: number;

    constructor(
        private httpService: HttpService
    ) {

    }

    createPod = (url: string, interval = 1000, countLoops = 0) => {

        if (!this.intervalFunction) {
            this.startedValuesPod();

            if (countLoops > 0) {
                this.haveLoop = true;
                this.countLoopsRemain = countLoops;
            }

            this.intervalFunction = setInterval(() => {

                if (this.podStatus === PodStatus.ATIVO) {

                    const timeResponseInit = new Date();

                    this.httpService.getHttpService(url)
                        .pipe(
                            take(1)
                        )
                        .subscribe((response) => {
                            this.timeResponse = new Date().getTime() - timeResponseInit.getTime();
                            this.sumAlltimeResponse += this.timeResponse;
                            this.countRequestsSuccess++;

                            if (this.haveLoop) {
                                this.countLoopsRemain--;
                            }

                            if (this.haveLoop && this.countLoopsRemain <= 0) {
                                this.podStatus = PodStatus.FINALIZADO;
                                this.stopPod();
                            }

                            this.saveNewLog(StatusLog.SUCESSO, response, this.timeResponse);

                        }, (err) => {

                            this.countRequestsFailed++;

                            this.saveNewLog(StatusLog.ERROR, err, 0);

                            if (this.countRequestsFailed >= 3) {
                                this.podStatus = PodStatus.ERROR;
                                this.stopPod();
                            }

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

    getHasLoop(): boolean {
        return this.haveLoop;
    }

    getLoopRemain(): number {
        return this.countLoopsRemain;
    }

    getCountSuccess(): number {
        return this.countRequestsSuccess;
    }

    getCountError(): number {
        return this.countRequestsFailed;
    }

    getAverageTimeResponse(): number {
        const calc = this.sumAlltimeResponse / this.countRequestsSuccess;
        return (calc) ? Math.round(calc) : 0;
    }

    getAverageTimeResponseFromLogs(): number {
        let sumTimes = 0;

        this.requestsLogs.forEach((log: ServiceRequestLog) => {
            sumTimes += log.timeResponse;
        });

        return sumTimes / this.countRequestsSuccess;

    }

    getPodStatus(): PodStatus {
        return this.podStatus;
    }

    stopPod(): void {
        this.podStatus = this.podStatus === PodStatus.ATIVO ? PodStatus.DESATIVADO : this.podStatus;
        clearInterval(this.intervalFunction);
        this.sendChange();
    }

    /**
     * Pode ser que esse método tenha mais funções futuramente
     */
    killPod(): void {
        this.stopPod();
    }

    private saveNewLog(status: StatusLog, response: unknown, timeResponse: number): void {
        const log = new ServiceRequestLog();
        log.status = status;
        log.timeResponse = timeResponse;
        log.response = response;
        this.requestsLogs.push(log);
    }

    private startedValuesPod(): void {
        this.hashName = Md5.hashStr((Math.random() * 9999).toString());
        this.podStatus = PodStatus.ATIVO;
        this.eventEmitter = new EventEmitter<ServicePod>();
    }

    private sendChange(): void {
        this.eventEmitter.emit(this);
    }

}
