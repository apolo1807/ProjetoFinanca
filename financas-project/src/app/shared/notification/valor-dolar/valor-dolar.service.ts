import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValorDolarService {

  constructor(private httpClient: HttpClient) { }

  findDollarValue():Observable<any> {
    return this.httpClient.get(`https://economia.awesomeapi.com.br/last/USD-BRL`)
  }

}
