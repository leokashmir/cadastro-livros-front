import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { LivroService } from '../../services/livro';
import { AutorService } from '../../services/autor';
import { AssuntoService } from '../../services/assunto';
import { Livro as LivroModel } from '../../model/livro.model';
import { Autor } from '../../model/autor.model';
import { Assunto } from '../../model/assunto.model';

@Component({
  selector: 'app-livro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
    NzFormModule,
    NzPopconfirmModule,
    NzCardModule,
    NzSpaceModule,
    NzTooltipModule,
    NzSelectModule,
    NzInputNumberModule,
    NzGridModule
  ],
  templateUrl: './livro.html',
  styleUrl: './livro.css',
})
export class Livro implements OnInit {
  livros: LivroModel[] = [];
  filteredLivros: LivroModel[] = [];
  searchText: string = '';
  isModalVisible: boolean = false;
  isEditMode: boolean = false;
  currentLivro: LivroModel = this.getEmptyLivro();
  pageSize: number = 10;
  pageIndex: number = 1;
  loading: boolean = false;

  // Listas para os selects
  autores: Autor[] = [];
  assuntos: Assunto[] = [];
  selectedAutorIds: number[] = [];
  selectedAssuntoIds: number[] = [];

  constructor(
    private livroService: LivroService,
    private autorService: AutorService,
    private assuntoService: AssuntoService,
    private message: NzMessageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAutoresAndAssuntos();
  }

  getEmptyLivro(): LivroModel {
    return {
      id: null,
      titulo: '',
      edicao: 1,
      valor: 0,
      editora: '',
      anoPublicacao: new Date().getFullYear(),
      autores: [],
      assuntos: []
    };
  }

  loadAutoresAndAssuntos(): void {
    this.autorService.findAll().subscribe({
      next: (data) => {
        this.autores = data;
      },
      error: (error) => {
        console.error('Erro ao carregar autores:', error);
      }
    });

    this.assuntoService.findAll().subscribe({
      next: (data) => {
        this.assuntos = data;
      },
      error: (error) => {
        console.error('Erro ao carregar assuntos:', error);
      }
    });
  }

  search(): void {
    this.loading = true;
    this.pageIndex = 1;

    this.livroService.findAll().subscribe({
      next: (data) => {
        if (this.searchText.trim() === '') {
          this.livros = data;
          this.filteredLivros = data;
        } else {
          this.livros = data;
          this.filteredLivros = data.filter(livro =>
            livro.titulo.toLowerCase().includes(this.searchText.toLowerCase())
          );
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar livros:', error);
        this.message.error('Erro ao carregar livros');
        this.loading = false;
      }
    });
  }

  clearSearch(): void {
    this.searchText = '';
    this.livros = [];
    this.filteredLivros = [];
    this.pageIndex = 1;
  }

  showModal(): void {
    this.isEditMode = false;
    this.currentLivro = this.getEmptyLivro();
    this.selectedAutorIds = [];
    this.selectedAssuntoIds = [];
    this.isModalVisible = true;
  }

  showEditModal(livro: LivroModel): void {
    this.isEditMode = true;
    this.currentLivro = { ...livro };
    this.selectedAutorIds = livro.autores.map(a => a.id);
    this.selectedAssuntoIds = livro.assuntos.map(a => a.id);
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.currentLivro = this.getEmptyLivro();
    this.selectedAutorIds = [];
    this.selectedAssuntoIds = [];
  }

  handleOk(): void {
    if (!this.validateLivro()) {
      return;
    }

    // Mapear IDs selecionados para objetos
    this.currentLivro.autores = this.selectedAutorIds.map(id =>
      this.autores.find(a => a.id === id)!
    );
    this.currentLivro.assuntos = this.selectedAssuntoIds.map(id =>
      this.assuntos.find(a => a.id === id)!
    );

    if (this.isEditMode) {
      this.updateLivro();
    } else {
      this.createLivro();
    }
  }

  validateLivro(): boolean {
    if (!this.currentLivro.titulo || this.currentLivro.titulo.trim() === '') {
      this.message.warning('Por favor, preencha o título');
      return false;
    }
    if (!this.currentLivro.editora || this.currentLivro.editora.trim() === '') {
      this.message.warning('Por favor, preencha a editora');
      return false;
    }
    if (this.selectedAutorIds.length === 0) {
      this.message.warning('Por favor, selecione pelo menos um autor');
      return false;
    }
    if (this.selectedAssuntoIds.length === 0) {
      this.message.warning('Por favor, selecione pelo menos um assunto');
      return false;
    }
    return true;
  }

  createLivro(): void {
    this.livroService.save(this.currentLivro).subscribe({
      next: (data) => {
        this.message.success('Livro criado com sucesso');
        this.isModalVisible = false;
        this.search();
      },
      error: (error) => {
        console.error('Erro ao criar livro:', error);
        this.message.error('Erro ao criar livro');
      }
    });
  }

  updateLivro(): void {
    if (this.currentLivro.id === null) {
      this.message.error('ID do livro não pode ser nulo');
      return;
    }

    this.livroService.partialUpdate(this.currentLivro.id, this.currentLivro).subscribe({
      next: (data) => {
        this.message.success('Livro atualizado com sucesso');
        this.isModalVisible = false;
        this.search();
      },
      error: (error) => {
        console.error('Erro ao atualizar livro:', error);
        this.message.error('Erro ao atualizar livro');
      }
    });
  }

  confirmDelete(livro: LivroModel): void {
    this.deleteLivro(livro.id);
  }

  deleteLivro(id: number | null): void {
    if (id === null) {
      this.message.error('ID do livro não pode ser nulo');
      return;
    }

    this.livroService.delete(id).subscribe({
      next: () => {
        this.message.success('Livro excluído com sucesso');
        this.search();
      },
      error: (error) => {
        console.error('Erro ao excluir livro:', error);
        this.message.error('Erro ao excluir livro');
      }
    });
  }

  getAutoresNomes(autores: Autor[]): string {
    return autores.map(a => a.nome).join(', ');
  }

  getAssuntosDescricoes(assuntos: Assunto[]): string {
    return assuntos.map(a => a.descricao).join(', ');
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
