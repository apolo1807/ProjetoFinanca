import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GastosModel, Page } from './gastos-model';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  urlGasto: string = environment.apiGastoURL;

  constructor(private httpClient: HttpClient) { }

  salvar(gastos: GastosModel):Observable<GastosModel> {
    return this.httpClient.post<GastosModel>(`${this.urlGasto}/new`, gastos);
  }

  getGastosPageable(page: number, size: number):Observable<Page> {
    return this.httpClient.get<Page>(`${this.urlGasto}?page=${page}&size=${size}`);
  }

  getGastos():Observable<GastosModel[]> {
    return this.httpClient.get<GastosModel[]>(`${this.urlGasto}`);
  }

  findById(id: number):Observable<GastosModel> {
    return this.httpClient.get<GastosModel>(`${this.urlGasto}/${id}`);
  }

  delete(gastos: GastosModel):Observable<GastosModel> {
    return this.httpClient.delete<GastosModel>(`${this.urlGasto}/${gastos.id}`);
  }

}
