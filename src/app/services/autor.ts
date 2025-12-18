import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../model/autor.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutorService {
  private apiUrl = `${environment.apiUrl}/autores`;

  constructor(private http: HttpClient) {}


  findAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl);
  }


  findById(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.apiUrl}/${id}`);
  }

  findByNome(nome: string): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${this.apiUrl}/search`, {
      params: { nome }
    });
  }


  create(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }


  partialUpdate(id: number, autor: Partial<Autor>): Observable<Autor> {
    return this.http.patch<Autor>(`${this.apiUrl}/${id}`, autor);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
