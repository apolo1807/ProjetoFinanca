import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculoService {

  apiURL: string = "/api/calculos";

  constructor(private httpClient: HttpClient) { }

  getCalculoValores():Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}`);
  }

}
