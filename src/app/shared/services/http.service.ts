import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/response.model';

@Injectable({ providedIn: 'root' })
export class HttpService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getHttpService(URL: string): Observable<ResponseModel> {
        return this.httpClient.get<ResponseModel>(URL);
    }

    testService(): ResponseModel {
        const test = new ResponseModel();
        test.timeResponse = Math.round(Math.random() * 50);
        return test;
    }

}
