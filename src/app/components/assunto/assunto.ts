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
import { AssuntoService } from '../../services/assunto';
import { Assunto as AssuntoModel } from '../../model/assunto.model';

@Component({
  selector: 'app-assunto',
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
  templateUrl: './assunto.html',
  styleUrl: './assunto.css',
})
export class Assunto implements OnInit {
  assuntos: AssuntoModel[] = [];
  filteredAssuntos: AssuntoModel[] = [];
  searchText: string = '';
  isModalVisible: boolean = false;
  isEditMode: boolean = false;
  currentAssunto: AssuntoModel = { id: 0, descricao: '' };
  pageSize: number = 10;
  pageIndex: number = 1;
  loading: boolean = false;

  constructor(
    private assuntoService: AssuntoService,
    private message: NzMessageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

  }

  loadAssuntos(): void {
    this.loading = true;
    this.assuntoService.findAll().subscribe({
      next: (data) => {
        this.assuntos = data;
        this.filteredAssuntos = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar assuntos:', error);
        this.message.error('Erro ao carregar assuntos');
        this.loading = false;
      }
    });
  }

  search(): void {
    this.loading = true;
    this.pageIndex = 1;

    if (this.searchText.trim() === '') {
      // Se não tiver descrição, busca todos os assuntos
      this.assuntoService.findAll().subscribe({
        next: (data) => {
          this.assuntos = data;
          this.filteredAssuntos = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao carregar assuntos:', error);
          this.message.error('Erro ao carregar assuntos');
          this.loading = false;
        }
      });
    } else {
      // Se tiver descrição, busca por descrição específica
      this.assuntoService.findByDescricao(this.searchText).subscribe({
        next: (data) => {
          this.assuntos = data;
          this.filteredAssuntos = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao pesquisar assuntos:', error);
          this.message.error('Erro ao pesquisar assuntos');
          this.loading = false;
        }
      });
    }
  }

  clearSearch(): void {
    this.searchText = '';
    this.assuntos = [];
    this.filteredAssuntos = [];
    this.pageIndex = 1;
  }

  showModal(): void {
    this.isEditMode = false;
    this.currentAssunto = { id: 0, descricao: '' };
    this.isModalVisible = true;
  }

  showEditModal(assunto: AssuntoModel): void {
    this.isEditMode = true;
    this.currentAssunto = { ...assunto };
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.currentAssunto = { id: 0, descricao: '' };
  }

  handleOk(): void {
    if (!this.currentAssunto.descricao || this.currentAssunto.descricao.trim() === '') {
      this.message.warning('Por favor, preencha a descrição');
      return;
    }

    if (this.isEditMode) {
      this.updateAssunto();
    } else {
      this.createAssunto();
    }
  }

  createAssunto(): void {
    this.assuntoService.create(this.currentAssunto).subscribe({
      next: (data) => {
        this.message.success('Assunto criado com sucesso');
        this.isModalVisible = false;
        this.search(); // Recarrega a pesquisa atual
      },
      error: (error) => {
        console.error('Erro ao criar assunto:', error);
        this.message.error('Erro ao criar assunto');
      }
    });
  }

  updateAssunto(): void {
    this.assuntoService.partialUpdate(this.currentAssunto.id, this.currentAssunto).subscribe({
      next: (data) => {
        this.message.success('Assunto atualizado com sucesso');
        this.isModalVisible = false;
        this.search(); // Recarrega a pesquisa atual
      },
      error: (error) => {
        console.error('Erro ao atualizar assunto:', error);
        this.message.error('Erro ao atualizar assunto');
      }
    });
  }

  deleteAssunto(id: number): void {
    this.assuntoService.delete(id).subscribe({
      next: () => {
        this.message.success('Assunto excluído com sucesso');
        this.search(); // Recarrega a pesquisa atual
      },
      error: (error) => {
        console.error('Erro ao excluir assunto:', error);
        this.message.error('Erro ao excluir assunto');
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
