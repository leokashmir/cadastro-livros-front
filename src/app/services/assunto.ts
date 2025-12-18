import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assunto } from '../model/assunto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssuntoService {
  private apiUrl = `${environment.apiUrl}/assuntos`;

  constructor(private http: HttpClient) {}


  findAll(): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(this.apiUrl);
  }


  findById(id: number): Observable<Assunto> {
    return this.http.get<Assunto>(`${this.apiUrl}/${id}`);
  }

  findByDescricao(descricao: string): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(`${this.apiUrl}/search`, {
      params: { descricao }
    });
  }


  create(assunto: Assunto): Observable<Assunto> {
    return this.http.post<Assunto>(this.apiUrl, assunto);
  }


  partialUpdate(id: number, assunto: Partial<Assunto>): Observable<Assunto> {
    return this.http.patch<Assunto>(`${this.apiUrl}/${id}`, assunto);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
