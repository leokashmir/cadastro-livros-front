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
import { AutorService } from '../../services/autor';
import { Autor as AutorModel } from '../../model/autor.model';

@Component({
  selector: 'app-autor',
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
    NzTooltipModule
  ],
  templateUrl: './autor.html',
  styleUrl: './autor.css',
})
export class Autor implements OnInit {
  autores: AutorModel[] = [];
  filteredAutores: AutorModel[] = [];
  searchText: string = '';
  isModalVisible: boolean = false;
  isEditMode: boolean = false;
  currentAutor: AutorModel = { id: 0, nome: '' };
  pageSize: number = 10;
  pageIndex: number = 1;
  loading: boolean = false;

  constructor(
    private autorService: AutorService,
    private message: NzMessageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

  }

  loadAutores(): void {
    this.loading = true;
    this.autorService.findAll().subscribe({
      next: (data) => {
        this.autores = data;
        this.filteredAutores = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar autores:', error);
        this.message.error('Erro ao carregar autores');
        this.loading = false;
      }
    });
  }

  search(): void {
    this.loading = true;
    this.pageIndex = 1;

    if (this.searchText.trim() === '') {
      // Se não tiver nome, busca todos os autores
      this.autorService.findAll().subscribe({
        next: (data) => {
          this.autores = data;
          this.filteredAutores = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao carregar autores:', error);
          this.message.error('Erro ao carregar autores');
          this.loading = false;
        }
      });
    } else {
      // Se tiver nome, busca por nome específico
      this.autorService.findByNome(this.searchText).subscribe({
        next: (data) => {
          this.autores = data;
          this.filteredAutores = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao pesquisar autores:', error);
          this.message.error('Erro ao pesquisar autores');
          this.loading = false;
        }
      });
    }
  }

  clearSearch(): void {
    this.searchText = '';
    this.autores = [];
    this.filteredAutores = [];
    this.pageIndex = 1;
  }

  showModal(): void {
    this.isEditMode = false;
    this.currentAutor = { id: 0, nome: '' };
    this.isModalVisible = true;
  }

  showEditModal(autor: AutorModel): void {
    this.isEditMode = true;
    this.currentAutor = { ...autor };
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.currentAutor = { id: 0, nome: '' };
  }

  handleOk(): void {
    if (!this.currentAutor.nome || this.currentAutor.nome.trim() === '') {
      this.message.warning('Por favor, preencha o nome');
      return;
    }

    if (this.isEditMode) {
      this.updateAutor();
    } else {
      this.createAutor();
    }
  }

  createAutor(): void {
    this.autorService.create(this.currentAutor).subscribe({
      next: (data) => {
        this.message.success('Autor criado com sucesso');
        this.isModalVisible = false;
        this.search(); // Recarrega a pesquisa atual
      },
      error: (error) => {
        console.error('Erro ao criar autor:', error);
        this.message.error('Erro ao criar autor');
      }
    });
  }

  updateAutor(): void {
    this.autorService.partialUpdate(this.currentAutor.id, this.currentAutor).subscribe({
      next: (data) => {
        this.message.success('Autor atualizado com sucesso');
        this.isModalVisible = false;
        this.search(); // Recarrega a pesquisa atual
      },
      error: (error) => {
        console.error('Erro ao atualizar autor:', error);
        this.message.error('Erro ao atualizar autor');
      }
    });
  }

  deleteAutor(id: number): void {
    this.autorService.delete(id).subscribe({
      next: () => {
        this.message.success('Autor excluído com sucesso');
        this.search(); // Recarrega a pesquisa atual
      },
      error: (error) => {
        console.error('Erro ao excluir autor:', error);
        this.message.error('Erro ao excluir autor');
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
