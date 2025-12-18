import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../model/report.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Relatorio {
  private apiUrl = `${environment.apiUrl}/relatorios`;

  constructor(private http: HttpClient) {}


  getReport(): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl);
  }


  getReportByLivroId(livroId: number): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/${livroId}`);
  }


  getReportPdf(
    titulo?: string,
    autor?: string,
    assunto?: string,
    valorMin?: number,
    valorMax?: number
  ): Observable<Blob> {
    const headers = new HttpHeaders({
      'Accept': 'application/pdf'
    });

    let params: any = {};
    if (titulo) params.titulo = titulo;
    if (autor) params.autor = autor;
    if (assunto) params.assunto = assunto;
    if (valorMin !== undefined && valorMin !== null) params.valorMin = valorMin.toString();
    if (valorMax !== undefined && valorMax !== null) params.valorMax = valorMax.toString();

    return this.http.get(`${this.apiUrl}/pdf`, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }


  downloadReportPdf(
    titulo?: string,
    autor?: string,
    assunto?: string,
    valorMin?: number,
    valorMax?: number
  ): void {
    this.getReportPdf(titulo, autor, assunto, valorMin, valorMax).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'relatorio-livros.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Erro ao baixar o PDF:', error);
      }
    });
  }
}
