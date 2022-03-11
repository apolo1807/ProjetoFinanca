import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page, Renda } from './renda-model';

@Injectable({
  providedIn: 'root'
})
export class RendaService {

  apiRenda: string = environment.apiRendaURL;

  constructor(private httpClient: HttpClient) { }

  salvarRenda(renda: Renda):Observable<Renda> {
    return this.httpClient.post<Renda>(`${this.apiRenda}/new`, renda);
  }

  getRendas():Observable<Renda[]> {
    return this.httpClient.get<Renda[]>(`${this.apiRenda}`);
  }

  getRendasPageable(page: number, size: number):Observable<Page> {
    return this.httpClient.get<Page>(`${this.apiRenda}?page=${page}&size=${size}`);
  }

  findById(id: number):Observable<Renda> {
    return this.httpClient.get<Renda>(`${this.apiRenda}/${id}`);
  }

  delete(renda: Renda):Observable<Renda> {
    return this.httpClient.delete<Renda>(`${this.apiRenda}/${renda.id}`);
  }

}
