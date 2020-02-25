import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';

@Injectable({ providedIn: 'root' })
export class HttpService {

    constructor(
        private httpClient: HttpClient
    ) { }

    // tslint:disable-next-line: ban-types
    getHttpService(URL: string): Observable<Object> {
        return this.httpClient.get(URL);
    }

}
