import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FinancasPessoais } from './financas/pessoais/financasPessoaisDomain';
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
    return this.httpClient.get<FinancasPessoais[]>(`${this.apiURL}`)
  }

  findById(id: number):Observable<FinancasPessoais> {
    return this.httpClient.get<FinancasPessoais>(`${this.apiURL}/${id}`);
  }

  deleteFinanca(financasPessoais: FinancasPessoais):Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/${financasPessoais.id}`);
  }

}
