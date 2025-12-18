import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../model/livro.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private apiUrl = `${environment.apiUrl}/livros`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  findById(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }

  save(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro);
  }

  partialUpdate(id: number, livro: Partial<Livro>): Observable<Livro> {
    return this.http.patch<Livro>(`${this.apiUrl}/${id}`, livro);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
