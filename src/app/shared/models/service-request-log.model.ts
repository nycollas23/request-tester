import { StatusLog } from '../enum/status-log.enum';

export class ServiceRequestLog {
    status: StatusLog;
    timeResponse: number;
    // tslint:disable-next-line: ban-types
    response: Object;
}
