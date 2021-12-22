import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class CryptoService {

  constructor(private httpClient: HttpClient) { }

  cryptoPrice(coin: any):Observable<any> {
    return this.httpClient.get(`https://www.mercadobitcoin.net/api/${coin}/ticker/`);
  }

}
