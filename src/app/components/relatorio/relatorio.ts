import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Relatorio as RelatorioService } from '../../services/relatorio';
import { Report } from '../../model/report.model';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzFormModule,
    NzCardModule,
    NzRadioModule,
    NzInputNumberModule,
    NzGridModule
  ],
  templateUrl: './relatorio.html',
  styleUrl: './relatorio.css',
})
export class Relatorio {
  // Filtros de pesquisa
  titulo: string = '';
  autor: string = '';
  assunto: string = '';
  valorMin?: number;
  valorMax?: number;

  // Opção selecionada (grid ou pdf)
  resultOption: 'grid' | 'pdf' = 'grid';

  // Dados do grid
  reports: Report[] = [];
  loading: boolean = false;
  pageSize: number = 10;
  pageIndex: number = 1;

  constructor(
    private relatorioService: RelatorioService,
    private message: NzMessageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  search(): void {
    if (this.resultOption === 'grid') {
      this.searchGrid();
    } else {
      this.downloadPdf();
    }
  }

  searchGrid(): void {
    this.loading = true;
    this.pageIndex = 1;

    this.relatorioService.getReport().subscribe({
      next: (data) => {
        // Filtrar os dados localmente baseado nos critérios
        this.reports = this.filterReports(data);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar relatórios:', error);
        this.message.error('Erro ao carregar relatórios');
        this.loading = false;
      }
    });
  }

  filterReports(data: Report[]): Report[] {
    return data.filter(report => {
      let matches = true;

      if (this.titulo && this.titulo.trim() !== '') {
        matches = matches && report.tituloLivro.toLowerCase().includes(this.titulo.toLowerCase());
      }

      if (this.autor && this.autor.trim() !== '') {
        matches = matches && report.nomesAutores.toLowerCase().includes(this.autor.toLowerCase());
      }

      if (this.assunto && this.assunto.trim() !== '') {
        matches = matches && report.descricoesAssuntos.toLowerCase().includes(this.assunto.toLowerCase());
      }

      if (this.valorMin !== undefined && this.valorMin !== null) {
        matches = matches && report.valorLivro >= this.valorMin;
      }

      if (this.valorMax !== undefined && this.valorMax !== null) {
        matches = matches && report.valorLivro <= this.valorMax;
      }

      return matches;
    });
  }

  downloadPdf(): void {
    this.relatorioService.downloadReportPdf(
      this.titulo || undefined,
      this.autor || undefined,
      this.assunto || undefined,
      this.valorMin,
      this.valorMax
    );
    this.message.success('Download do PDF iniciado');
  }

  clearFilters(): void {
    this.titulo = '';
    this.autor = '';
    this.assunto = '';
    this.valorMin = undefined;
    this.valorMax = undefined;
    this.reports = [];
    this.pageIndex = 1;
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
