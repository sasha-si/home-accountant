import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Bill } from '../interfaces/bill';
import baseURL from 'src/app/shared/services/base-url';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getBill(): Observable<Bill> {
    return this.http.get<Bill>(`${baseURL}bill`);
  };

  getCurrency(cur: string):Observable<any> {
    return this.http.get<any>(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${cur}&json`);
  };
 }
