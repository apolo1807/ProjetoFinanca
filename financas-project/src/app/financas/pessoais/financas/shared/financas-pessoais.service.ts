import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FinancasPessoais, Page } from './financasPessoaisDomain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiURL: string = environment.apiPessoaisURL;

  constructor(private httpClient: HttpClient) { }

  salvar(financasPessoais: FinancasPessoais):Observable<FinancasPessoais> {
    return this.httpClient.post<FinancasPessoais>(`${this.apiURL}/new`, financasPessoais);
  }

  getFinancas():Observable<FinancasPessoais[]> {
    return this.httpClient.get<FinancasPessoais[]>(`${this.apiURL}`);
  }

  getFinancasPageable(page: number, size: number):Observable<Page> {
    return this.httpClient.get<Page>(`${this.apiURL}?page=${page}&size=${size}`);
  }

  findById(id: number):Observable<FinancasPessoais> {
    return this.httpClient.get<FinancasPessoais>(`${this.apiURL}/${id}`);
  }

  deleteFinanca(financasPessoais: FinancasPessoais):Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/${financasPessoais.id}`);
  }

  declararPago(financasPessoais: FinancasPessoais):Observable<FinancasPessoais> {
    return this.httpClient.post<FinancasPessoais>(`${this.apiURL}/declararPago`, financasPessoais);
  }

  adiantarParcela(financasPessoais: FinancasPessoais):Observable<FinancasPessoais> {
    return this.httpClient.put<FinancasPessoais>(`${this.apiURL}/adiantarParcela`, financasPessoais);
  }

}
